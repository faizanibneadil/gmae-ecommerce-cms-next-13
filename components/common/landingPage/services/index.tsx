"use client";

import { ExternalLink } from "lucide-react";

export default function Services() {
  return (
    <>
      <section className="">
        <div className="flex justify-between px-2">
          <h6 className="text-lg font-bold truncate line-clamp-1 dark:text-white">
            Our Services.
          </h6>
          <div className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
            See more
          </div>
        </div>
        <div className="w-full pb-4 space-x-4 carousel carousel-center">
          <div className="carousel-item">
            <div className="w-[15rem] rounded-2xl bg-base-300">
              <img
                className="rounded-t-2xl"
                src="https://img.freepik.com/free-vector/computer-technician-with-wrench-repairing-computer-screen-with-gears-computer-service-laptop-repair-center-notebook-setup-service-concept-bright-vibrant-violet-isolated-illustration_335657-952.jpg"
              />
              <div className="px-4 py-2">
                <h5 className="mb-2 tracking-tight text-gray-900 text-md dark:text-white line-clamp-1">
                  Macbook, Laptop, Computer
                </h5>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 line-clamp-3">
                  Software installation and Hardware repairing.
                </p>
                <button className="inline-flex items-center text-blue-600 hover:underline">
                  See details
                  <ExternalLink className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="w-[15rem] rounded-2xl bg-base-300">
              <img
                className="rounded-t-2xl"
                src="https://img.freepik.com/premium-vector/smart-phone-cloud-database_48369-10611.jpg"
              />
              <div className="px-4 py-2">
                <h5 className="mb-2 tracking-tight text-gray-900 text-md dark:text-white line-clamp-1">
                  iPhone, iPads
                </h5>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 line-clamp-3">
                  Activation lock, Logo hang problem, Board repairing, Panel and
                  iCloud restore and etc.
                </p>
                <button className="inline-flex items-center text-blue-600 hover:underline">
                  See details
                  <ExternalLink className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="w-[15rem] rounded-2xl bg-base-300">
              <img
                className="rounded-t-2xl"
                src="https://img.freepik.com/premium-photo/technician-repairing-broken-smartphone-desk_77206-97.jpg"
              />
              <div className="px-4 py-2">
                <h5 className="mb-2 tracking-tight text-gray-900 text-md dark:text-white line-clamp-1">
                  Mobile Repairing
                </h5>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 line-clamp-3">
                  Flashing, Panel change, Software problem, Glass change and
                  Board shortage etc.
                </p>
                <button className="inline-flex items-center text-blue-600 hover:underline">
                  See details
                  <ExternalLink className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="w-[15rem] rounded-2xl bg-base-300">
              <img
                className="rounded-t-2xl"
                src="https://img.freepik.com/premium-vector/immigration-template-hand-drawn-cartoon-flat-illustration-document-with-visa-passport_2175-7960.jpg"
              />
              <div className="px-4 py-2">
                <h5 className="mb-2 tracking-tight text-gray-900 text-md dark:text-white line-clamp-1">
                  PTA
                </h5>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 line-clamp-3">
                  PTA Approved service Available on CNIC, PTA Approved service
                  Available on Passport etc.
                </p>
                <button className="inline-flex items-center text-blue-600 hover:underline">
                  See details
                  <ExternalLink className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
