import { MetadataRoute } from "next"



export default function manifest() : MetadataRoute.Manifest {
	return {
		name: "3legant",
    short_name: "3legant",
    icons: [
        {
            src: "/favicon/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
        },
        {
            src: "/favicon/android-chrome-384x384.png",
            sizes: "384x384",
            type: "image/png"
        }
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone"
	}
}