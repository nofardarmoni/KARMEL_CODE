import { memo } from "react";
import _ from "lodash"

const deepCompareMemo = (component) =>
  memo(component, (prevProps, nextProps) =>
    _.isEqual(prevProps, nextProps)
  )

export default deepCompareMemo;