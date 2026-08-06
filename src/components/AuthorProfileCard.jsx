import React from 'react';
import Card from './ui/Card';

/**
 * Kartu profil bersama untuk halaman jurnalis & editor.
 * Sebelumnya DetailWriter/DetailEditor punya markup terpisah yang saling drift
 * (bentuk avatar, breakpoint, object-fit beda). Satukan di sini.
 */
function AuthorProfileCard({ name, image, bio, roleLabel, RoleIcon }) {
    const initial = (name?.trim()?.charAt(0) || '?').toUpperCase();

    return (
        <Card className="relative overflow-hidden bg-base-100 border border-base-200 shadow-[0_10px_35px_rgba(0,0,0,0.10)] rounded-3xl mb-8">
            {/* Banner gradien */}
            <div className="h-24 md:h-28 bg-gradient-to-r from-primary via-primary to-secondary" />

            <div className="px-6 md:px-8 pb-8">
                <div className="flex flex-col md:flex-row gap-5 md:gap-6 md:items-center -mt-14 md:-mt-16">
                    {/* Avatar */}
                    <div className="shrink-0">
                        {image ? (
                            <img
                                src={image}
                                alt={name}
                                className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover ring-4 ring-base-100 shadow-lg bg-neutral"
                            />
                        ) : (
                            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl ring-4 ring-base-100 shadow-lg bg-gradient-to-br from-primary to-secondary text-primary-content flex items-center justify-center">
                                <span className="text-5xl font-bold select-none">{initial}</span>
                            </div>
                        )}
                    </div>

                    {/* Nama + peran + bio */}
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{name}</h1>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-base-100 text-primary ring-1 ring-primary/20 shadow-sm px-3 py-1 text-xs font-semibold">
                                {RoleIcon && <RoleIcon className="w-3.5 h-3.5" />}
                                {roleLabel}
                            </span>
                        </div>
                        <p className="text-base-content/60 leading-relaxed max-w-2xl">
                            {bio || `${roleLabel} TIMES Indonesia`}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default AuthorProfileCard;
