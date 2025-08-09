import React from "react";

export default function BreakingNews() {
  return (
    <section className="bg-linear-to-bl from-[#800b19] to-[#3e154f] text-white py-4">
      <div className="max-w-7xl mx-auto px-6 max-md:px-4">
        <div className="flex items-center justify-between gap-6 max-md:flex-col max-md:gap-3">
          <div className="bg-white text-red-600 px-4 py-2 rounded-md font-semibold text-sm whitespace-nowrap">
            Breaking News
          </div>
          <div className="overflow-hidden flex-1">
            <marquee className="text-lg font-medium max-md:text-base">
              Kanye West says he's running for president in 2020.
            </marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
