/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './interface/student/student.interface';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';

@Injectable()
export class StudentService {
    private students: Student[] = [];

    getAllStudents(): Student[] {
        return this.students;
    }

    getStudentById(id: number) {
        return this.students.find((s) => s.id === id);
    }

    createStudent(createStudentDto: CreateStudentDto): Student {
        const newStudent: Student = {
            id: Date.now(),
            ...createStudentDto,
        };

        this.students.push(newStudent);
        return newStudent;

    }


    putStudent(id: number, createStudentDto: CreateStudentDto): Student {
        const index = this.students.findIndex((s) => s.id === id);

        if (index == -1) throw new NotFoundException("Student not found");

        this.students[index] = { id, ...createStudentDto };
        return this.students[index];
    }


    patchStudent(id: number, updateStudentDto: UpdateStudentDto): Student {
        const index = this.students.findIndex((s) => s.id === id);

        if (index == -1) throw new NotFoundException("Student not found");

        const updateStudent = {
            ...this.students[index],
            ...updateStudentDto,
        }

        this.students[index] = updateStudent;
        return updateStudent;

    }


    deleteStudent(id: number): Student {
        const index = this.students.findIndex((s) => s.id === id);
        if (index == -1) throw new NotFoundException("Student not found");
        const [deleted] = this.students.splice(index, 1);
        return deleted;
    }
}
