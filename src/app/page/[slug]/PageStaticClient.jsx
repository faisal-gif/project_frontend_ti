'use client'
import PageStaticMenu from '@/components/PageStaticMenu';
import Card from '@/components/ui/Card'
import { Hash, User } from "lucide-react";
import Link from 'next/link';
import React, { useState } from 'react'


function PageStaticClient({ InitialPageDetail }) {

    const [pageDetail, setPageDetail] = useState(InitialPageDetail);

    return (
        <main className="pt-6">
            {/* Main Content */}
            <section className="py-16">
                <div className="max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto px-4">

                    <div className="max-w-none md:col-span-2">

                        <Card className="bg-[#7b0f1f] shadow-lg rounded-lg p-2 mb-6 w-full flex flex-row items-center gap-2 text-white">
                            <Hash size={16} />
                            <h3 className="text-lg font-semibold text-white ">{pageDetail?.page_name}</h3>
                        </Card>
                        <div className='prose prose-lg max-w-none'>
                            <div className="bg-white rounded-lg shadow-sm border px-4 py-2">
                             < div dangerouslySetInnerHTML={{ __html: pageDetail?.page_isi }} />
                            </div>
                        </div>
                    </div>
                    <div className='md:col-span-1 max-w-none '>
                        <PageStaticMenu />
                    </div>

                </div>
            </section>
        </main>
    )
}

export default PageStaticClient