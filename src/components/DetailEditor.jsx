import React from 'react';
import { BadgeCheck } from 'lucide-react';
import AuthorProfileCard from './AuthorProfileCard';

function DetailEditor({ authorData }) {
    if (!authorData) {
        return null;
    }

    return (
        <AuthorProfileCard
            name={authorData.editor_name}
            image={authorData.editor_image}
            bio={authorData.editor_description}
            roleLabel="Editor"
            RoleIcon={BadgeCheck}
        />
    );
}

export default DetailEditor;
