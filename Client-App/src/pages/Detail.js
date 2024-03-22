import InfoProduct from "../component/Detail/InfoProduct";
import axios from "axios";
function DetailPage() {
  return (
    <>
      <InfoProduct />
    </>
  );
}
export default DetailPage;
// export async function loader() {
//   try {
//     const response = await axios;
//   } catch (e) {
//     throw new Error(e);
//   }
// }
