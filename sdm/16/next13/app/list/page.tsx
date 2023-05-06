import Image from "next/image";
import img1 from "@/public/1.png";
import img2 from "@/public/2.png";
import img3 from "@/public/3.png";
export default function List() {
  return (
    <>
      <h1>list page</h1>
      <Image src={img1} alt="speak" width="100" height="100" />
      <Image src={img2} alt="asd" width="100" height="100" />
      <Image src={img3} alt="qwe" width="100" height="100" />
    </>
  );
}
