import { useEffect, useState } from "react";
import { useCreateCourseMutation } from "../../features/courses/coursesApi";
import Button from "./Button";

const CreateCourseModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  const [createCourse, { isLoading, isSuccess }] = useCreateCourseMutation();

  // Automatically close modal on success
  useEffect(() => {
    if (isSuccess) {
      onClose();
      // Optionally, reset the form
      setName("");
      setCode("");
      setDescription("");
    }
  }, [isSuccess, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCourse({ name, code, description }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Create Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Course Name"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Course Code"
            className="w-full border p-2 rounded"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseModal;
