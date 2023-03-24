import React from "react";
import styles from "./errorPage.css"
import {FormattedMessage} from "react-intl";
import {useNavigate} from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex min-h-full flex-col bg-white lg:relative">
        <div className="flex flex-grow flex-col">
          <main className="flex flex-grow flex-col bg-white">
            <div className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-4 sm:px-6 lg:px-8">
              <div className="flex-shrink-0 pt-10 sm:pt-16">
                <a href="/" className="inline-flex">
                  <img
                    className="h-12 w-auto"
                    src="https://cdn-icons-png.flaticon.com/64/1052/1052784.png"
                    alt=""
                  />
                </a>
              </div>
              <div className="my-auto flex-shrink-0 py-16 sm:py-32">
                <p className="text-base font-semibold text-red-600">404</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">

                  <FormattedMessage
                      id="Page not found"
                      defaultMessage="Default error message"
                  />
                </h1>
                <p className="mt-2 text-base text-gray-500">
                  <FormattedMessage
                      id="Sorry, we couldn’t find the page you’re looking for."
                      defaultMessage="Default error message"
                  />
                </p>
                <div className="mt-6">

                  <button
                      id="homeBtn"
                      className="text-base font-medium text-red-600 hover:text-gray-500"
                      onClick={() => {
                        navigate('/');
                      }}
                      color="inherit"
                  >

                    <FormattedMessage
                        id="Home"
                        defaultMessage="Default error message"
                    />
                    <span aria-hidden="true"> &rarr;</span>
                  </button>

                </div>
              </div>
            </div>
          </main>
          <footer className="flex-shrink-0 bg-gray-50">
            <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <nav className="flex space-x-4">
                <a
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-600"
                >

                </a>

                <button
                    id="homeSupport"
                    className="text-sm font-medium text-gray-500 hover:text-gray-600"
                    onClick={() => {
                      navigate('/');
                    }}
                    color="inherit"
                >
                  <FormattedMessage
                      id="Contact Support"
                      defaultMessage="Default error message"
                  />
                  <span aria-hidden="true"> &rarr;</span>
                </button>

                <span
                  className="inline-block border-l border-gray-300"
                  aria-hidden="true"
                />
              </nav>
            </div>
          </footer>
        </div>
        <div className="hidden lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-1/2">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://i.pinimg.com/originals/42/55/88/425588bfc6c7bbfad5f822694277b95a.gif"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
