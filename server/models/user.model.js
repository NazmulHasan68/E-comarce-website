import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: "Abcd@gmail.com"
  },
  distric: {
    type: String,
    default: "Dhaka"
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["instructor", "student"],
    default: "student"
  },
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }
  ],
  enrolledBook: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    }
  ],
  photoUrl: {
    type: String,
    default:
      "https://as2.ftcdn.net/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
  },
  enrolledClass: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamAndSheet"
    }
  ],
  // ✅ Updated field
  enrolledSubject: [
    {
      classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExamAndSheet",
        required: true
      },
      subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      }
    }
  ],
  examResult: [
    {
      examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExamAndSheet",
        required: true
      },
      score: {
        type: Number,
        required: true
      },
      time: {
        type: Number,
        required: true
      },
      submittedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  certificate: {
    type: String,
    default: "0"
  },
  otp: String,
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);






