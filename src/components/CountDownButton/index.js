import Taro, { Component } from "@tarojs/taro";
import { Text, Button } from "@tarojs/components";
import classNames from 'classnames'
import "./index.scss";

const LCCountDownButtonState = {
  LCCountDownButtonActive: 0,
  LCCountDownButtonDisable: 1
};
// {id , startTime, deathCount}
var timeRecodes = []; //根据id来记录LCCountDownButton的信息

export default class CountDownButton extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.shouldSetState = true;
    this.state = {
      btnTitle: this.props.beginText ? this.props.beginText : "默认",
      buttonState: LCCountDownButtonState.LCCountDownButtonActive
    };
  }
  static defaultProps = {
    id: 1, //按钮的身份标识,同一个页面的按钮是同一个id
    beginText: "获取验证码", //初始状态按钮title
    endText: "重新获取", //读秒结束后按钮的title
    count: 60, //总的计时数 单位是秒s
    onClick: () => {console.error('参数错误：倒计时按钮组件没传入点击事件！')}, //按下按钮的事件,但是触发倒数(startCountDown)需要你自己来调用
    changeWithCount: (count) => {return count+'秒'}, //读秒变化的函数,该函数带有一个参数count,表示当前的剩余时间
    end: () => {}, //读秒完毕后的回调,读秒结束触发
    frameStyle: {}, //初始化的
    disableStyle: {}, //按钮禁用的时候样式                 (有默认)
    activeStyle: {}, //active情况下按钮样式              (有默认)
    disableTextStyle: {}, //按钮禁用的时候里面文字的样式        (有默认)
    activeTextStyle: {} //active情况下按钮里面文字的样式      (有默认)
  };
  componentDidMount() {
    const { id, changeWithCount } = this.props;
    for (var i = 0; i < timeRecodes.length; i++) {
      let obj = timeRecodes[i];
      if (obj.id == id) {
        let liveTime = Date.now() - obj.startTime;
        if (liveTime < obj.deathCount * 1000) {
          //避免闪动
          let detalTime = Math.round(liveTime / 1000);
          let content = changeWithCount(obj.deathCount - detalTime);
          this.setState({
            btnTitle: content
          });
          //手动调用倒计时
          this._startCountDownWithCount(obj.startTime);
        }
      }
    }
  }

  componentWillUnmount() {
    this.shouldSetState = false;
    this._clearTime();
  }

  _startCountDownWithCount(startTime) {
    this.setState({
      buttonState: LCCountDownButtonState.LCCountDownButtonDisable
    });
    const { changeWithCount, endText, count, end } = this.props;
    this.startTime = startTime;
    const  intervalFunction=()=>{
      let detalTime = Math.round((Date.now() - this.startTime) / 1000);
      let content = changeWithCount(count - detalTime);
      if (detalTime >= count) {
        content = endText;
        this._clearTime();
        end && end();
        this.setState({
          buttonState: LCCountDownButtonState.LCCountDownButtonActive
        });
      }
      if (this.shouldSetState) {
        this.setState({
          btnTitle: content
        });
      }
    }
    intervalFunction(); // 立即执行一次  避免setInterval延迟
    this.interval = setInterval(intervalFunction, 1000);
  }

  _clearTime() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  _recordButtonInfo() {
    const { id, count } = this.props;
    var hasRecord = false;
    for (var i = 0; i < timeRecodes.length; i++) {
      let obj = timeRecodes[i];
      if (obj.id == id) {
        obj.startTime = Date.now();
        hasRecord = true;
        break;
      }
    }
    if (!hasRecord) {
      let buttonInfo = {
        id: id,
        deathCount: count,
        startTime: Date.now()
      };
      timeRecodes.push(buttonInfo);
    }
  }

  //外界调用
  startCountDown() {
    this._startCountDownWithCount(Date.now());
    this._recordButtonInfo();
  }

  _buttonPressed=() =>{ 
    this.props.onClick(); 
  }

  render() {
    const {
      frameStyle,
      disableStyle,
      activeStyle,
      disableTextStyle,
      activeTextStyle
    } = this.props;
    let isDisable = this.state.buttonState == LCCountDownButtonState.LCCountDownButtonDisable;
    return (
      <Button
        disabled={isDisable}
        onClick={this._buttonPressed}
        className={classNames(
          "buttonCommonStyle",
          isDisable ? "disableButtonStyle" : "activeButtonStyle",
          isDisable ? disableStyle : activeStyle,
          frameStyle
        )}
      >
        <Text
          className={classNames(
            "txtCommonStyle",
            isDisable ? "disableTxtStyle " : "activeTxtStyle",
            isDisable ? disableTextStyle : activeTextStyle
          )}
        >
          {this.state.btnTitle}
        </Text>
      </Button>
    );
  }
}
