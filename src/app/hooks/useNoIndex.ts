import { useEffect } from "react";

export const useNoIndex = () => {
    useEffect(() => {
        const existingRobotsMeta = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
        const robotsMeta = existingRobotsMeta ?? document.createElement("meta");
        const previousContent = robotsMeta.getAttribute("content");

        robotsMeta.setAttribute("name", "robots");
        robotsMeta.setAttribute("content", "noindex");

        if (!existingRobotsMeta) {
            document.head.appendChild(robotsMeta);
        }

        return () => {
            if (!existingRobotsMeta) {
                robotsMeta.remove();
                return;
            }

            if (previousContent === null) {
                robotsMeta.removeAttribute("content");
                return;
            }

            robotsMeta.setAttribute("content", previousContent);
        };
    }, []);
};
