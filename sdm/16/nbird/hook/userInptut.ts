import { ChangeEvent, useCallback, useState } from "react";

export default (init:number | string): [number | string, ((e: ChangeEvent<HTMLInputElement>) => void)] => {
const [value, setValue] = useState(init);
  const handle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  )
  return [value, handle];
}