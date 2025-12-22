'use client'
import React, { useRef, useState } from 'react';

import { useForm } from 'react-hook-form';
import {
    Check,
    Star,
    Crown,
    Zap,
    PenLine,
    Camera,
    Users,
    Award,
    ArrowRight,
    User,
    Mail,
    Phone,
    FileText,
    Loader2,
    Badge,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const WriterRegistration = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const pricingPlans = [
        {
            id: 'starter',
            name: 'Penulis Pemula',
            price: 'Gratis',
            priceNote: 'Selamanya',
            icon: PenLine,
            color: 'from-emerald-500 to-teal-600',
            borderColor: 'border-emerald-500/30',
            features: [
                'Publikasi hingga 5 artikel/bulan',
                'Profil penulis dasar',
                'Akses komunitas penulis',
                'Badge penulis pemula',
                'Statistik dasar artikel'
            ],
            limitations: [
                'Tidak ada monetisasi',
                'Tanpa prioritas review'
            ],
            popular: false
        },
        {
            id: 'professional',
            name: 'Penulis Profesional',
            price: 'Rp 99.000',
            priceNote: '/bulan',
            icon: Star,
            color: 'from-[#313742] to-blue-600',
            borderColor: 'border-primary/50',
            features: [
                'Publikasi artikel tak terbatas',
                'Profil penulis premium',
                'Monetisasi artikel',
                'Prioritas review editor',
                'Badge penulis profesional',
                'Statistik lengkap & analitik',
                'Akses eksklusif webinar',
                'Dukungan prioritas'
            ],
            limitations: [],
            popular: true
        },
        {
            id: 'photographer',
            name: 'Fotografer Jurnalistik',
            price: 'Rp 149.000',
            priceNote: '/bulan',
            icon: Camera,
            color: 'from-purple-500 to-pink-600',
            borderColor: 'border-purple-500/30',
            features: [
                'Semua fitur Profesional',
                'Galeri fotografi pribadi',
                'Jual foto ke redaksi',
                'Badge fotografer',
                'Kredit foto di setiap artikel',
                'Pelatihan fotografi eksklusif',
                'Equipment review access',
                'Portfolio showcase'
            ],
            limitations: [],
            popular: false
        },
        {
            id: 'enterprise',
            name: 'Tim Redaksi',
            price: 'Rp 499.000',
            priceNote: '/bulan',
            icon: Crown,
            color: 'from-amber-500 to-orange-600',
            borderColor: 'border-amber-500/30',
            features: [
                'Hingga 10 akun penulis',
                'Dashboard tim editorial',
                'Workflow kolaborasi',
                'Brand newsroom sendiri',
                'API akses',
                'Dedicated account manager',
                'Custom training',
                'White-label option'
            ],
            limitations: [],
            popular: false
        }
    ];

    const benefits = [
        { icon: Users, title: 'Jangkauan Luas' },
        { icon: Award, title: 'Kredibilitas' },
        { icon: Zap, title: 'Monetisasi' },
    ];

    const handleSelectPlan = (id) => {
        setSelectedPlan(id);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        await new Promise((r) => setTimeout(r, 1500));
        setIsSubmitting(false);

        reset();
        setSelectedPlan(null);
    };

    const selectedPlanData = pricingPlans.find((p) => p.id === selectedPlan);

    return (
        <div className="min-h-screen bg-background">
            {/* HERO */}
            <section className="py-20 text-center">

                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                            Jadilah Bagian dari
                            <span className="block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                Jurnalis Terdepan
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            Tulis, publikasikan, dan bagikan cerita Anda kepada jutaan pembaca.
                            Pilih paket yang sesuai dengan kebutuhan Anda.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
                        {benefits.map((b, i) => (
                            <Card
                                key={i}
                                className="bg-base-200/50 backdrop-blur-sm border border-base-200/50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <b.icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">{b.title}</h3>

                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRICING */}
            {/* Pricing Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Pilih Paket Berlangganan
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Mulai dari gratis hingga enterprise, kami punya paket untuk semua kebutuhan Anda
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pricingPlans.map((plan) => (
                            <div
                                key={plan.id}
                                onClick={() => handleSelectPlan(plan.id)}
                                className={`relative bg-card rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden group hover:shadow-xl ${selectedPlan === plan.id
                                    ? `${plan.borderColor} shadow-lg scale-[1.02]`
                                    : 'border-border hover:border-primary/30'
                                    } ${plan.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
                            >
                                {/* Popular Badge */}
                                {plan.popular && (
                                    <div className={`absolute top-0 left-0 right-0 bg-gradient-to-r ${plan.color} text-white text-center py-2 text-sm font-medium`}>
                                        Paling Populer
                                    </div>
                                )}

                                <div className={`p-6 ${plan.popular ? 'pt-12' : ''}`}>
                                    {/* Icon & Name */}
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                                        <plan.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                                        <span className="text-muted-foreground text-sm">{plan.priceNote}</span>
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm">
                                                <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                                <span className="text-foreground">{feature}</span>
                                            </li>
                                        ))}
                                        {plan.limitations.map((limitation, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                                                <span className="w-5 h-5 shrink-0 mt-0.5 text-center">—</span>
                                                <span>{limitation}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <Button
                                        className={`w-full group/btn ${plan.popular
                                            ? `bg-gradient-to-r ${plan.color} hover:opacity-90`
                                            : 'bg-red-800 text-secondary-foreground hover:bg-[#7b0f1f] hover:text-primary-foreground border border-0'
                                            }`}
                                    >
                                        Pilih Paket
                                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FORM */}
            {selectedPlan && (
                <section ref={formRef} className="py-8 bg-muted/30">

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="max-w-2xl mx-auto bg-white p-8 rounded-2xl space-y-6"
                    >
                        {/* Selected Plan Summary */}
                        {selectedPlanData && (
                            <div className="mb-8 p-4 bg-base-300/50 rounded-xl ">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedPlanData.color} flex items-center justify-center`}>
                                        <selectedPlanData.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Paket yang dipilih:</p>
                                        <p className="font-bold text-foreground">{selectedPlanData.name} - {selectedPlanData.price}{selectedPlanData.priceNote}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="ml-auto text-primary"
                                        onClick={() => setSelectedPlan(null)}
                                    >
                                        Ubah
                                    </Button>
                                </div>
                            </div>
                        )}

                        <h2 className="text-3xl font-bold text-center">
                            Form Pendaftaran
                        </h2>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='flex flex-col gap-2'>
                                <label>Nama Lengkap <span className='text-error'>*</span></label>
                                <input
                                    {...register('fullName', { required: true, minLength: 3 })}
                                    className="input"
                                />
                                {errors.fullName && (
                                    <p className="text-red-500 text-sm">Nama wajib diisi</p>
                                )}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label>Email <span className='text-error'>*</span></label>
                                <input
                                    type="email"
                                    {...register('email', { required: true })}
                                    className="input"
                                />
                            </div>

                            <div className='flex flex-col gap-2 md:col-span-2 '>
                                <label>Nomor Telepon <span className='text-error'>*</span></label>
                                <input
                                    {...register('phone', { required: true })}
                                    className="input w-full"
                                />
                            </div>
                        </div>



                        <div >
                            <label>
                                <input
                                    type="checkbox"
                                    {...register('agreeTerms', { required: true })}
                                />{' '}
                                Saya setuju dengan syarat & ketentuan
                            </label>
                            {errors.agreeTerms && (
                                <p className="text-red-500 text-sm">
                                    Wajib menyetujui syarat
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full btn btn-primary"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin" /> Memproses...
                                </>
                            ) : (
                                <>
                                    Daftar Sekarang <ArrowRight />
                                </>
                            )}
                        </button>
                    </form>
                </section>
            )}

            {/* FAQ Section */}
            <section className="py-20 px-6 bg-base-300/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                        Pertanyaan yang Sering Diajukan
                    </h2>

                    <div className="space-y-4">
                        {[
                            {
                                q: 'Bagaimana cara mulai menulis?',
                                a: 'Setelah mendaftar dan memilih paket, Anda bisa langsung mengakses dashboard penulis untuk mulai membuat artikel.'
                            },
                            {
                                q: 'Apakah ada proses review artikel?',
                                a: 'Ya, setiap artikel akan direview oleh tim editor kami untuk memastikan kualitas dan akurasi informasi.'
                            },
                            {
                                q: 'Bagaimana sistem monetisasi bekerja?',
                                a: 'Anda akan mendapat komisi berdasarkan jumlah pembaca artikel Anda. Pembayaran dilakukan setiap bulan.'
                            },
                            {
                                q: 'Bisakah upgrade atau downgrade paket?',
                                a: 'Tentu! Anda bisa mengubah paket kapan saja melalui dashboard akun Anda.'
                            }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-card border border-border rounded-xl p-6">
                                <h4 className="font-semibold text-foreground mb-2">{faq.q}</h4>
                                <p className="text-muted-foreground text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-12 border border-border/50">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Siap Memulai Karir Jurnalistik Anda?
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            Bergabung dengan ribuan penulis dan fotografer profesional yang telah mempercayai kami
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                                <PenLine className="w-5 h-5" />
                                Daftar Sekarang
                            </Button>
                            <Button size="lg" variant="outline" className="gap-2">
                                Hubungi Kami
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default WriterRegistration;
