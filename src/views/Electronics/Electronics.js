// import AltFooter from "components/AltFooter/AltFooter";
import Banner from "components/Banner/Banner";
import FooterBanner from "components/Banner/FooterBanner";
import IframeSearchPart from "./../../components/IframeElectronics/IframeSeatchPart";
import Menu from "./../../components/home/menu/menu";
import AltFooter from "./../../components/home/footer/footer";


const Electronics = () => (
  <div>
    <div className='menuColor1'>
      <Menu />
    </div>
    <div>
      <Banner />
      {/* <div id="iframe-searchpart">
        <IframeSearchPart />
      </div> */}
      <AltFooter />
    </div>
  </div>
)

export default Electronics;