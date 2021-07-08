const menus = [
    {
        title: 'Home',
        icon: 'fas fa-home',
        href: "/dashboard",
        children: false
    },
    {
        title: 'Users',
        icon: 'fas fa-users',
        href: "#",
        children: [
            {
                title: 'List',
                icon: 'fas fa-list',
                href: "/users"
            },
            {
                title: 'Add Teacher',
                icon: 'fas fa-plus',
                href: "/users/addTeacher"
            },
            {
                title: 'Add Student',
                icon: 'fas fa-plus',
                href: "/users/addStudent"
            },
            {
                title: 'Add Parent',
                icon: 'fas fa-plus',
                href: "/users/addParent"
            }
        ]
    },
    {
        title: 'Classes',
        icon: 'fas fa-chalkboard-teacher',
        href: "#",
        children: [
            {
                title: 'List',
                icon: 'fas fa-list',
                href: "/classes"
            },
            {
                title: 'TimeTable',
                icon: 'fas fa-calendar-alt',
                href: "/classes/timetable"
            },
            {
                title: 'Add Class',
                icon: 'fas fa-plus',
                href: "/classes/new"
            }
        ]
    },
    {
        title: 'Attendance',
        icon: 'fas fa-clipboard',
        href: "#",
        children: [
            {
                title: 'View',
                icon: 'fas fa-list',
                href: "/attendance"
            },
            {
                title: 'Take attendance',
                icon: 'fas fa-calendar-alt',
                href: "/attendance/add"
            },
        ]
    },
    {
        title: 'Exams',
        icon: 'fas fa-book-open',
        href: "#",
        children: [
            {
                title: 'List',
                icon: 'fas fa-list',
                href: "/exams"
            },
            {
                title: 'Add Exam',
                icon: 'fas fa-plus',
                href: "/exams/new"
            }
        ]
    },
    {
        title: 'Notices',
        icon: 'fas fa-book',
        href: "#",
        children: [
            {
                title: 'List',
                icon: 'fas fa-list',
                href: "/notices/1"
            },
            {
                title: 'Add Notice',
                icon: 'fas fa-plus',
                href: "/notices/new"
            },
           
        ]
    },
    {
        title: 'Comments',
        icon: 'fas fa-comments',
        href: "#",
        children: [
            {
                title: 'List',
                icon: 'fas fa-list',
                href: "/comments/1"
            },
            {
                title: 'Add Comment',
                icon: 'fas fa-plus',
                href: "/comments/new"
            },
           
        ]
    },
    {
        title: 'Requests',
        icon: 'fas fa-file-signature',
        href: "/fleet-management/requests",
        children: false
    },
    {
        title: 'Fleet Requests',
        icon: 'fas fa-envelope-open-text',
        href: "#",
        children: [
            {
                title: 'View',
                icon: 'fas fa-eye',
                href: "/fleet-management/supplies/req"
            },
            {
                title: 'Request',
                icon: 'fas fa-plus',
                href: "/fleet-management/supplies/new/req"
            }
        ]
    }
];

module.exports = menus;