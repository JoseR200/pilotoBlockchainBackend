import {Controller, Get, Param, Post} from '@nestjs/common';
import {AttendanceService} from "./attendance.service";

@Controller('attendance')
export class AttendanceController {

  constructor(private readonly attendanceService: AttendanceService) {}

  @Post(':teacherId/:studentId/:latitude/:longitude')
  async recordAttendance(@Param('teacherId') teacherId: number, @Param('studentId') studentId: number, @Param('latitude') latitude: number, @Param('longitude') longitude: number) {
    return this.attendanceService.recordAttendance(teacherId, studentId, latitude, longitude);
  }

  @Get('/student/:studentId')
  async getByStudent(@Param('studentId') studentId: number) {
    return this.attendanceService.getByStudent(studentId);
  }

  @Get('/professor/:professorId')
  async getByProfessor(@Param('professorId') professorId: number) {
    return this.attendanceService.getByProfessor(professorId);
  }
}
