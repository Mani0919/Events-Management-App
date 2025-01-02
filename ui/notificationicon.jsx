import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Bell = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke="#403C56"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 6.667a5 5 0 0 0-10 0c0 5.833-2.5 7.5-2.5 7.5h15S14 12.5 14 6.667M10.442 17.5a1.667 1.667 0 0 1-2.884 0"
    />
  </Svg>
)
export default Bell
