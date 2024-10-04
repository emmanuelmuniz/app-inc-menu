import { useCallback } from 'react';

import { UpdateSectionsService } from '@/app/edition/services/section/updateSectionsService/UpdateSectionsService';

const useReorderSections = (sections, setSections) => {
    const updateDraggedSections = useCallback(async (sectionsToUpdate) => {
        try {
            await UpdateSectionsService(sectionsToUpdate);
            console.log('Sections updating result');
        } catch (error) {
            console.error('Failed to update sections:', error);
        }
    }, []);

    const reorder = useCallback(async (list, startId, endId) => {
        const result = Array.from(list);

        const startIndex = result.findIndex(section => section._id === startId);
        const endIndex = result.findIndex(section => section._id === endId);

        if (startIndex === -1 || endIndex === -1) {
            console.error("No se encontraron las categorías a reordenar");
            return list;
        }

        const startSection = result[startIndex];
        const endSection = result[endIndex]

        const originalStartSequence = startSection.sequence;
        const originalEndSequence = endSection.sequence;

        if (startIndex < endIndex) {
            result.forEach(section => {
                if (section.sequence > originalStartSequence && section.sequence <= originalEndSequence) {
                    section.sequence -= 1;
                }
            });
        }
        else if (startIndex > endIndex) {
            result.forEach(section => {
                if (section.sequence >= originalEndSequence && section.sequence < originalStartSequence) {
                    section.sequence += 1;
                }
            });
        }

        startSection.sequence = originalEndSequence;

        const reorderedSections = result.sort((a, b) => a.sequence - b.sequence);

        await updateDraggedSections(reorderedSections);

        return reorderedSections;
    }, [updateDraggedSections]);

    const handleDragEnd = useCallback(async (result) => {
        if (!result.destination) {
            return;
        }

        const startId = sections[result.source.index]._id;
        const endId = sections[result.destination.index]._id;

        const updatedSections = await reorder(sections, startId, endId);

        setSections(updatedSections.sort((a, b) => a.sequence - b.sequence));
    }, [sections, reorder, setSections]);

    return { handleDragEnd };
};


export default useReorderSections;
