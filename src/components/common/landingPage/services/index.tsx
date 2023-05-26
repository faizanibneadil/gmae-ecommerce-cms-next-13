"use client";

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

export default function Services() {
  return (
    <>
      <section>
        <div className="flex justify-between">
          <h6 className="text-lg font-bold truncate line-clamp-1 dark:text-white">
            Our Services.
          </h6>
          <div className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
            See more
          </div>
        </div>
        <div className="w-full pb-4 space-x-4 carousel carousel-center">
          <div className="carousel-item">
            <div className="w-[15rem] p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img src="/computer-repair-service.png" className="w-24" />
              <a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  Macbook, Laptop, Computer
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                Software installation and Hardware repairing.
              </p>

              <a
                href="#"
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                See details
                <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
          <div className="carousel-item">
            <div className="w-[15rem] p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img src="/ipad-glass-icon-1.png" className="w-24" />

              <a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  iPhone, iPads
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                Activation lock, Logo hang problem, Board repairing, Panel and
                iCloud restore and etc.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                See details
                <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
          <div className="carousel-item">
            <div className="w-[15rem] p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img src="/ipad-glass-icon-1.png" className="w-24" />

              <a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  Mobile Repairing
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                Flashing, Panel change, Software problem, Glass change and Board
                shortage etc.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                See details
                <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
          <div className="carousel-item">
            <div className="w-[15rem] p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img src="/PakTelecom.png" className="w-24" />

              <a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  PTA
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                PTA Approved service Available on CNIC, PTA Approved service
                Available on Passport etc.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                See details
                <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
