document.addEventListener('DOMContentLoaded', () => {
    
    // MOCK DATA PARA GITHUB PAGES (SIN BASE DE DATOS)
    const mockStages = [
        { stageId: 1, title: "Evaluación Preliminar", description: "Evaluación preliminar de viabilidad técnica y económica.", status: "completed" },
        { stageId: 2, title: "Desarrollo de Diseños", description: "Se desarrollan y optimizan los diseños para determinar los costos y beneficios esperados y la mejor alternativa de proyecto.", status: "completed" },
        { stageId: 3, title: "Planos y Detalles", description: "Se realizan los planos de detalles constructivos y documentación para la construcción.", status: "active" },
        { stageId: 4, title: "Calificación Ambiental", description: "Obtención de la Resolución de Calificación Ambiental favorable para el proyecto.", status: "pending" },
        { stageId: 5, title: "Construcción", description: "Materialización de las Obras.", status: "pending" },
        { stageId: 6, title: "Operación", description: "Puesta en Operación y mantención del embalse.", status: "pending" }
    ];

    const mockMeetings = [
        {
            _id: "m1",
            title: "Reunión de Participación Ciudadana N°1",
            date: "2024-05-15",
            description: "Presentación inicial del proyecto a la comunidad, donde se resolvieron dudas generales sobre el diseño y ubicación del embalse Bollenar.",
            imageUrl: "images/actividad1.jpg",
            pdfUrl: null
        },
        {
            _id: "m2",
            title: "Mesa de Trabajo Técnica Ambiental",
            date: "2024-08-10",
            description: "Discusión técnica sobre los impactos ambientales y la protección de la flora local.",
            imageUrl: "images/actividad2.jpg",
            pdfUrl: null
        }
    ];

    loadTimeline();
    loadMeetings();

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-up').forEach(el => observer.observe(el));
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = '#fff';
            navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
        }
    });

    // Cargar Timeline (STATIC)
    function loadTimeline() {
        const container = document.getElementById('public-timeline-list');
        if (container) {
            container.innerHTML = '';
            mockStages.forEach(stage => {
                let statusClass = stage.status;
                let desc = stage.description || '';

                container.innerHTML += `
                    <div class="timeline-item ${statusClass}">
                        <div class="timeline-marker">${stage.stageId}</div>
                        <div class="timeline-content">
                            <h3>${stage.title}</h3>
                            <p>${desc}</p>
                        </div>
                    </div>
                `;
            });
        }
    }

    // Cargar Reuniones (STATIC)
    function loadMeetings() {
        const container = document.getElementById('public-meetings-list');
        if (container) {
            container.innerHTML = '';
            mockMeetings.forEach(meeting => {
                const date = new Date(meeting.date).toLocaleDateString('es-ES', {
                    year: 'numeric', month: 'long', day: 'numeric'
                });
                
                const imgSrc = meeting.imageUrl ? meeting.imageUrl : 'images/ubicacion_1.png';

                container.innerHTML += `
                    <div class="meeting-card">
                        <img src="${imgSrc}" alt="${meeting.title}" class="meeting-img" style="object-fit: cover;">
                        <div class="meeting-info">
                            <div class="meeting-meta">
                                <span>📅 ${date}</span>
                            </div>
                            <h3>${meeting.title}</h3>
                            <p>${meeting.description}</p>
                            ${meeting.pdfUrl ? `<a href="${meeting.pdfUrl}" class="btn-pdf" target="_blank">📄 Descargar Acta</a>` : ''}
                        </div>
                    </div>
                `;
            });
        }
    }
});
