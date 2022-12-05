import React from "react";
import NextImage, { StaticImageData } from "next/image"

interface StaticRequire {
    default: StaticImageData;
}
declare type StaticImport = StaticRequire | StaticImageData;

interface Props {
    src: StaticImport;
    alt: string;
    width: number;
    height: number;
}

const Image = (props: Props) => {
    const { src, alt, width, height } = props;
    return <NextImage alt={alt} src={src} width={width} height={height} />
}

export default Image