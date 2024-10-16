import { useCallback } from 'react';

import { UpdateSectionsService } from '@/app/edition/services/section/updateSectionsService/UpdateSectionsService';

const useReorderSections = (sections, setSections, setIsReordering) => {
    const updateDraggedSections = useCallback(async (sectionsToUpdate) => {
        try {
            await UpdateSectionsService(sectionsToUpdate);
            setIsReordering(false);
            console.log('Sections updated successfully');
        } catch (error) {
            console.error('Failed to update sections:', error);
        }
    }, []);

    const reorder = useCallback((list, startId, endId) => {
        const result = Array.from(list);
        const startIndex = result.findIndex(section => section._id === startId);
        const endIndex = result.findIndex(section => section._id === endId);

        if (startIndex === -1 || endIndex === -1) {
            console.error("No se encontraron las secciones a reordenar");
            return list;
        }

        const startSection = result[startIndex];
        const endSection = result[endIndex];
        const originalStartSequence = startSection.sequence;
        const originalEndSequence = endSection.sequence;

        if (startIndex < endIndex) {
            result.forEach(section => {
                if (section.sequence > originalStartSequence && section.sequence <= originalEndSequence) {
                    section.sequence -= 1;
                }
            });
        } else {
            result.forEach(section => {
                if (section.sequence >= originalEndSequence && section.sequence < originalStartSequence) {
                    section.sequence += 1;
                }
            });
        }

        startSection.sequence = originalEndSequence;

        return result.sort((a, b) => a.sequence - b.sequence);
    }, []);

    const handleDragEnd = useCallback(async (result) => {
        if (!result.destination) {
            return;
        }

        setIsReordering(true);

        const startId = sections[result.source.index]._id;
        const endId = sections[result.destination.index]._id;

        const updatedSections = reorder(sections, startId, endId);
        setSections(updatedSections);

        await updateDraggedSections(updatedSections);
    }, [sections, reorder, setSections, updateDraggedSections, setIsReordering]);

    return { handleDragEnd };
};

export default useReorderSections;
