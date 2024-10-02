import { DeleteSectionService } from '@/app/edition/services/section/deleteSectionService/DeleteSectionService'

export default function DeleteSectionForm({ section, categories, onSectionDeleted }) {
    const handleDeleteSection = async () => {
        if (hasAssociatedProducts()) {
            alert("La categoría tiene subcategorías asociados. Elimine las subcategorías " +
                "o cambie la categoría de las subcategorías asociadas para eliminar esta categoría");
        } else {
            try {
                const result = confirm("¿Estás seguro que desea eliminar esta categoría?");
                if (result) {
                    const id = section._id;
                    const response = await DeleteSectionService({ id });
                    alert("Categoría eliminada correctamente.");
                    onSectionDeleted();
                }
            } catch (error) {
                console.error("Error deleting category:", error);
                alert('Error al eliminar la categoría.');
            }
        }
    };

    const hasAssociatedProducts = () => {
        return categories.some(category => category.section._id === section._id);
    };


    return (
        <button onClick={handleDeleteSection}
            className="px-2 py-1 rounded-sm cursor-pointer bg-inc-light-blue transition hover:bg-inc-light-blue-hover text-white text-sm font-semibold">
            Eliminar
        </button>
    );
}