import React from 'react';
import { PenLine } from 'lucide-react';
import AuthorProfileCard from './AuthorProfileCard';

function DetailWriter({ authorData }) {
    if (!authorData) {
        return null;
    }

    return (
        <AuthorProfileCard
            name={authorData.name}
            image={authorData.image}
            bio={authorData.bio}
            roleLabel="Jurnalis"
            RoleIcon={PenLine}
        />
    );
}

export default DetailWriter;
