import { Modal, Button } from "antd";
import { useState } from "react";
import { postDataAPI } from "../../utils/fetchData";
import { useDispatch } from "react-redux";

export const AddBookListModal = ({
  visible,
  onCreate,
  onCancel,
  bookshelfId,
  auth,
}) => {
  const [bookListName, setBookListName] = useState("");
  const dispatch = useDispatch();
  const handleOk = async () => {
    try {
      console.log(bookshelfId);
      const response = await postDataAPI(
        `/bookshelves/${auth.user._id}/drawers`,
        { name: bookListName },
        auth.token
      );
      dispatch({ type: "ADD_DRAWER", payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = () => {
    onCancel();
    setBookListName("");
  };

  return (
    <Modal
      visible={visible}
      title="Add a book list"
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          style={{
            color: "black",
            border: "1px solid #e2dee2",
            shadow: "none",
          }}
          onClick={handleOk}
        >
          Add
        </Button>,
      ]}
    >
      <p>Enter the name of the book list:</p>
      <input
        style={{ border: "1px solid gray", borderRadius: "2px" }}
        type="text"
        value={bookListName}
        onChange={(e) => setBookListName(e.target.value)}
      />
    </Modal>
  );
};
