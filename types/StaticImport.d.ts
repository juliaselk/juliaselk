import { StaticImageData } from "next/image"

interface StaticRequire {
    default: StaticImageData;
}
declare type StaticImport = StaticRequire | StaticImageData;
export default StaticImport