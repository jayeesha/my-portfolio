import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger, ScrollSmoother, Draggable, InertiaPlugin, MorphSVGPlugin);

export { gsap, useGSAP, SplitText, ScrollTrigger, ScrollSmoother, Draggable, InertiaPlugin, MorphSVGPlugin };
