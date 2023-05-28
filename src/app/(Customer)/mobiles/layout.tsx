import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="px-4">
      <div className="w-full h-40 p-4 space-x-4 carousel carousel-center">
        <div className="carousel-item">
          <img
            src="https://img.freepik.com/free-vector/screensaver-wallpapers-smartphone-with-summer-landscape-with-trees-fields-girl-hiker-vector_107791-7422.jpg"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.freepik.com/free-vector/people-using-aumented-reality-smartphones_23-2148776055.jpg"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.freepik.com/free-psd/smartphone-mockup_1310-618.jpg"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.freepik.com/premium-psd/smartphone-screen-mockup-perspective-view_1297-394.jpg"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.freepik.com/free-vector/screensaver-wallpapers-smartphone-with-summer-landscape-with-trees-fields-girl-hiker-vector_107791-7422.jpg"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.freepik.com/free-vector/people-using-aumented-reality-smartphones_23-2148776055.jpg"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.freepik.com/free-psd/smartphone-mockup_1310-618.jpg"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.freepik.com/premium-psd/smartphone-screen-mockup-perspective-view_1297-394.jpg"
            className="rounded-box"
          />
        </div>
      </div>
      <div className="px-2">{children}</div>
    </div>
  );
}
