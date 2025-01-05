import * as React from "react"
import Svg, { Circle } from "react-native-svg"
const Notification = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Circle
      cx={18}
      cy={18}
      r={17.5}
      fill="#403C56"
      stroke="#403C56"
      opacity={0.1}
    />
  </Svg>
)
export default Notification
