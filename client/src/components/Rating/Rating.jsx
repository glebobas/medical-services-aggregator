// import { render } from "@headlessui/react/dist/utils/render";
import React, { useState, useEffect } from "react";
import styles from "./rating.css";

function Rating(props) {
  let { rat } = props;
  if (!rat) {
    rat = 0
  }
  // const [data, setData] = useState()
  const random = Math.random()
  const a = [0, 0, 0, 0, 0];
  function stars() {
    const ratMin = Math.floor(rat);
    const ratFloat = rat - ratMin;
    for (let i = 0; i < ratMin; i++) {
      a[i] = 100;
    }
    a[ratMin] = Math.floor(ratFloat * 100);
  }
  stars();
  //setData(a)


  return (
    <>
      <div className="inline-block min-w-content">
        <div>
          <svg
            width="0"
            height="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <defs>
              <linearGradient id={`${rat}<>${a[0]}<>${random}`} x1="0" x2="100%" y1="0" y2="0">
                <stop offset={`${a[0]}%`} stopColor="#fed94b"></stop>
                <stop offset={`${a[0]}%`} stopColor="#f7f0c3"></stop>
              </linearGradient>

              <symbol
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                id="star"
              >
                <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
              </symbol>
            </defs>
          </svg>
        </div>
        <div>
          <svg
            width="0"
            height="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <defs>
              <linearGradient id={`${rat}<>${a[1]}<>${random}`} x1="0" x2="100%" y1="0" y2="0">
                <stop offset={`${a[1]}%`} stopColor="#fed94b"></stop>
                <stop offset={`${a[1]}%`} stopColor="#f7f0c3"></stop>
              </linearGradient>

              <symbol
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                id="star"
              >
                <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
              </symbol>
            </defs>
          </svg>
        </div>
        <div>
          <svg
            width="0"
            height="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <defs>
              <linearGradient id={`${rat}<>${a[2]}<>${random}`} x1="0" x2="100%" y1="0" y2="0">
                <stop offset={`${a[2]}%`} stopColor="#fed94b"></stop>
                <stop offset={`${a[2]}%`} stopColor="#f7f0c3"></stop>
              </linearGradient>

              <symbol
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                id="star"
              >
                <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
              </symbol>
            </defs>
          </svg>
        </div>
        <div>
          <svg
            width="0"
            height="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <defs>
              <linearGradient id={`${rat}<>${a[3]}<>${random}`} x1="0" x2="100%" y1="0" y2="0">
                <stop offset={`${a[3]}%`} stopColor="#fed94b"></stop>
                <stop offset={`${a[3]}%`} stopColor="#f7f0c3"></stop>
              </linearGradient>

              <symbol
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                id="star"
              >
                <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
              </symbol>
            </defs>
          </svg>
        </div>
        <div>
          <svg
            width="0"
            height="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <defs>
              <linearGradient id={`${rat}<>${a[4]}<>${random}`} x1="0" x2="100%" y1="0" y2="0">
                <stop offset={`${a[4]}%`} stopColor="#fed94b"></stop>
                <stop offset={`${a[4]}%`} stopColor="#f7f0c3"></stop>
              </linearGradient>

              <symbol
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                id="star"
              >
                <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
              </symbol>
            </defs>
          </svg>
        </div>

        <p className="stars" aria-label="4.5 stars out of 5">
          <svg
            className="c-star active"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <use xlinkHref="#star" fill={`url(#${rat}<>${a[0]}<>${random})`}></use>

          </svg>
          <svg
            className="c-star active"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <use xlinkHref="#star" fill={`url(#${rat}<>${a[1]}<>${random})`}></use>
          </svg>
          <svg
            className="c-star active"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <use xlinkHref="#star" fill={`url(#${rat}<>${a[2]}<>${random})`}></use>
          </svg>
          <svg
            className="c-star active"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <use xlinkHref="#star" fill={`url(#${rat}<>${a[3]}<>${random})`}></use>
          </svg>
          <svg
            className="c-star active"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <use xlinkHref="#star" fill={`url(#${rat}<>${a[4]}<>${random})`}></use>
          </svg>
        </p>
      </div>
      <p className="text-left">{rat} / 5</p>
    </>
  );
}
export default React.memo(Rating);
