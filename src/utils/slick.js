const slickStyle = `
.slick-slider {
  position: relative;
  display: block;
  box-sizing: border-box;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -ms-touch-action: pan-y;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
}
.slick-list {
  position: relative;
  overflow: hidden;
  display: block;
  margin: 0;
  padding: 0;

  &:focus {
  outline: none;
  }

  &.dragging {
  cursor: grab;
  }
}
.slick-slider .slick-track,
.slick-slider .slick-list {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.slick-track {
  position: relative;
  left: 0;
  top: 0;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:before,
  &:after {
  content: "";
  display: table;
  }

  &:after {
  clear: both;
  }

  .slick-loading & {
  visibility: hidden;
  }
}
.slick-prev,
.slick-next
{
  font-size: 0;
  line-height: 0;
  position: absolute;
  top: 50%;
  display: block;
  width: 27px;
  height: 31px;
  padding: 0;
  transform: translate(-100%, -50%);
  background: transparent;
  cursor: pointer;
  color: transparent;
  border: none;
  outline: none;
}
.slick-next {
  right: 0;
  transform: translate(100%, -50%);
}
.slick-dots {
  position: absolute;
  top: calc(100% + 0.75rem);
  left: 0.5rem;
  right: 0.5rem;
  display: flex!important;
  justify-content: center;
  gap: 1rem;
  margin: 0;
  padding: 0;
  font-size: 0;
  list-style: none;

  button {
    width: 1rem;
    height: 1rem;
    padding: 0;
    border-radius: 0.5rem;
    background-color: transparent;
    cursor: pointer;
  }
}
.slick-slide {
  float: left;
  height: 100%;
  min-height: 1px;
  [dir="rtl"] & {
  float: right;
  }
  img {
  display: block;
  }
  &.slick-loading img {
  display: none;
  }

  display: none;

  &.dragging img {
  pointer-events: none;
  }

  .slick-initialized & {
  display: block;
  }

  .slick-loading & {
  visibility: hidden;
  }

  .slick-vertical & {
  display: block;
  height: auto;
  border: 1px solid transparent;
  }
}
.slick-arrow.slick-hidden {
  display: none;
}`

export default slickStyle
