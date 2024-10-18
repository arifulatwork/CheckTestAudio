# Getting data with real time updates from most common collections

Note all documents are returned as Firestore Documents so in order to access the data, you need to call `doc.data()` on them. It's useful to maintain the document itself, because then you can get the document id and ref from them directly.

## useStudentTasks
This hook can be used to get tasks as a Student or a Teacher

Usage: 
```ts
// As a student
const {tasks, loading, error, setId} = useStudentTasks('Student')

// When you get the user id, the hook starts listening to that student's tasks.
useEffect(() => {
    setId(userId)
}, [userId])

// later:
const taskData = tasks.map(task => task.data())
```

```typescript
// As a teacher. Note this might not be that useful on its own (because you'll need info of the users as well). See useStudentsWithTasks to get all data for the teacher.
const {tasks, loading, error, setId} = useStudentTasks('Teacher')

// When you get the user id, the hook starts listening to that teacher's students' tasks.
useEffect(() => {
    setId(userId)
}, [userId])

// later:
const taskData = tasks.map(task => task.data())
```

## useLessons
This is to get the next lesson information. The usage is similar than above

```typescript
const {lessons, loading, error, setId} = useLessons('Student' or 'Teacher')

// update id
useEffect(() => {
    setId(userId)
}, [userId])

// access docs:
const lessonData = lessons.map(lesson => lesson.data());
```

## useStudents
This used by the Teacher role. You need to know the student ids to use. You can get them from the `useLessons` hook or get everything from `useStudentsWithTasks` (recommended).

```typescript
const { students, loading, error, setStudentId } = useStudents();

useEffect(() => {
    setStudentId(studentIds)
}, [studentIds])

// access docs:
const studentData = students.map(s => s.data())

```

## useStudentsWithTasks
This is the most useful hook for the Teacher. It gets you everything needed to render student functionalities and with efficient Firebase usage.

```typescript
const { studentsWithTasks, setTeacherId, errors, loading } = useStudentsWithTasks()

useEffect(() => {
    // this will start listening to all collections in Firebase
    setTeacherId(userId);
}, [userId])

// later:
console.log(studentsWithTasks);

/*
All elements are Firebase docs, so remember to call doc.data() on each to access data.
[
    {
        studentDoc: Firebase doc for student,
        tasks: Firebase docs for that student's tasks,
        lessons: Firebase docs for that student's lessons. In theory, you can have many lessons associated with you if you are attending many schools. However, normally this array would only contain one document.
    }
]

*/
```

