import multer from "multer";

const MemoryStorage = multer.memoryStorage();
export const MemoryMulter = multer({ storage: MemoryStorage });
