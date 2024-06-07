'use client';
/**
 * NOTE: HorizontalLine
 * => 水平線(横線) Component
 */
const HorizontalLine = (props) => {
  /** DefaultStyle: グレーの縦線 */
  const defaultStyle = {
    width: "100%" /* 横線の幅を設定する => Defaultは、横幅いっぱいのStyle */,
    height: "1px" /* 横線の太さを設定する */,
    backgroundColor: "#AFAEB3" /* 横線の色を指定 */,
  };

  return <div style={{width: props.width, height: "1px",marginTop: props.marginTop, backgroundColor: props.bgColor}}></div>;
};

export default HorizontalLine;