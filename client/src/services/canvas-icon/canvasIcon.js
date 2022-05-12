import L from "leaflet";

export function canvasIcon(props) {
  return L.canvasIcon({
    iconSize: props.iconSize,
    className: props.className,
    drawIcon: function (icon, type) {
      if (type === "icon") {
        const ctx = icon.getContext("2d");
        const size = L.point(this.options.iconSize);
        const img = new Image(size.x, size.y);
        img.onload = function () {
          ctx.drawImage(this, 0, 0, this.width, this.height);
        };
        img.src = props.iconUrl;
      }
    },
  });
}
