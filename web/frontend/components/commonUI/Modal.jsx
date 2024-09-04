import { Modal } from "@shopify/polaris";
import { useUI } from "../../contexts/ui.context";
import ProductSeo from "../ProductSeo";
import CollectionSeo from "../CollectionSeo";

export function ModalArea() {
  const { modal, setCloseModal } = useUI();
  return (
    <Modal
      large
      open={modal?.isOpen}
      onClose={setCloseModal}
      title={modal?.data?.title || "Modal"}
    >
      <Modal.Section>
        {modal?.view === "CREATE_PRODUCT_SEO" && <ProductSeo />}
        {modal?.view === "CREATE_COLLECTION_SEO" && <CollectionSeo />}
      </Modal.Section>
    </Modal>
  );
}
