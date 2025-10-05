// Інтерфейс, що описує структуру будь-якого курсу.
interface Course {
    title: string;
    duration: number;
    students: string[];
}

// Клас, що реалізує інтерфейс Course.
class OnlineCourse implements Course {
    title: string;
    duration: number;
    students: string[];

    constructor(title: string, duration: number) {
        this.title = title;
        this.duration = duration;
        this.students = [];
    }

    registerStudent(student: string): void {
        // Додаємо перевірку, щоб не реєструвати дублікатів.
        // @ts-ignore
        if (this.students.includes(student)) {
            // ВИПРАВЛЕНО: Додано логування для цього випадку.
            console.log(`Помилка: Студент ${student} вже зареєстрований на курс "${this.title}".`);
        } else {
            this.students.push(student);
            // ВИПРАВЛЕНО: Додано логування успішної реєстрації.
            console.log(`Студент ${student} успішно зареєстрований на курс "${this.title}".`);
        }
    }

    isStudentRegistered(student: string): boolean {
        // @ts-ignore
        return this.students.includes(student);
    }
}

// Клас для управління всіма курсами.
class CourseManager {
    private courses: Course[] = [];

    addCourse(course: Course): void {
        this.courses.push(course);
        // ВИПРАВЛЕНО: Повернув логування, щоб було видно, що курс додано.
        console.log(`Курс "${course.title}" успішно додано до менеджера.`);
    }

    removeCourse(courseName: string): void {
        this.courses = this.courses.filter(c => c.title !== courseName);
        // ВИПРАВЛЕНО: Додано логування, щоб підтвердити видалення.
        console.log(`Курс "${courseName}" було видалено.`);
    }

    findCourse(courseName: string): Course | undefined {
        // @ts-ignore
        return this.courses.find(c => c.title === courseName);
    }

    listCourses(): void {
        // Додаємо відступ для кращої читабельності.
        console.log("\n--- Поточний список курсів ---");
        if (this.courses.length === 0) {
            console.log("Наразі немає доступних курсів.");
            return;
        }
        this.courses.forEach(c => {
            const studentList = c.students.length > 0 ? c.students.join(', ') : 'немає студентів';
            console.log(`- ${c.title} (Студенти: ${studentList})`);
        });
    }
}

// --- Демонстрація роботи виправленого коду ---
const courseManager = new CourseManager();
const tsCourse = new OnlineCourse("TypeScript Basics", 20);
const jsCourse = new OnlineCourse("JavaScript Advanced", 40);

// Крок 1: Додаємо курси
courseManager.addCourse(tsCourse);
courseManager.addCourse(jsCourse);

// Крок 2: Реєструємо студентів
tsCourse.registerStudent("Анна");
tsCourse.registerStudent("Петро");
tsCourse.registerStudent("Анна"); // Спроба зареєструвати дублікат
jsCourse.registerStudent("Марія");

// Крок 3: Виводимо список курсів ДО видалення
courseManager.listCourses();

// Крок 4: Видаляємо курс
courseManager.removeCourse("JavaScript Advanced");

// Крок 5: Виводимо фінальний список
courseManager.listCourses();