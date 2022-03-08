const slickStyle = `
.slick-slider {
  position: relative;
  display: block;
  margin-bottom: 1.5rem;
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
  cursor: pointer;
  cursor: hand;
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
  background-image: url("data:image/svg+xml,%3Csvg width='27' height='31' viewBox='0 0 27 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.5 17.9187C-0.499999 16.764 -0.500001 13.8772 1.5 12.7225L22.5 0.598169C24.5 -0.556532 27 0.886842 27 3.19624L27 27.445C27 29.7544 24.5 31.1977 22.5 30.043L1.5 17.9187Z' fill='%2326827C'/%3E%3C/svg%3E%0A");
  cursor: pointer;
  color: transparent;
  border: none;
  outline: none;
}
.slick-next {
  right: 0;
  transform: translate(100%, -50%);
  background-image: url("data:image/svg+xml,%3Csvg width='27' height='31' viewBox='0 0 27 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25.5 12.7224C27.5 13.8771 27.5 16.7639 25.5 17.9186L4.5 30.0429C2.5 31.1976 -1.38802e-06 29.7543 -1.28708e-06 27.4449L-2.27131e-07 3.19616C-1.26184e-07 0.886754 2.5 -0.556626 4.5 0.598075L25.5 12.7224Z' fill='%2326827C'/%3E%3C/svg%3E%0A");
}
.slick-dots {
  position: absolute;
  top: calc(100% + 0.75rem);
  left: 0.5rem;
  right: 0.5rem;
  display: flex!important;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  font-size: 0;
  list-style: none;

  button {
    width: 0.75rem;
    height: 0.75rem;
    padding: 0;
    border-radius: 0.375rem;
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
