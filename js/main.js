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
            title: "Reunión Interinstitucional",
            date: "2026-01-06T00:00:00",
            description: "Se presentó el proyecto a autoridades y encargados de distintso servicios públicos, donde se resolvieron dudas generales sobre el diseño.",
            images: [
                "Reuniones/Reunion 1/Fotos/IMG_8598.webp",
                "Reuniones/Reunion 1/Fotos/IMG_8599.webp",
                "Reuniones/Reunion 1/Fotos/IMG_8600.webp",
                "Reuniones/Reunion 1/Fotos/IMG_8621.webp"
            ],
            documents: []
        },
        {
            _id: "m_apr",
            title: "Reunión Seremi MOP O'Higgins y PAC 02",
            date: "2026-04-10T00:00:00",
            description: "Reunión de trabajo con el Seremi del MOP y segunda etapa de Participación Ciudadana (PAC 02).",
            images: [
                "Reuniones/Reunion PAC 02 (Abril 2026)/Fotos/Exposición del estudio de diseño.JPG",
                "Reuniones/Reunion PAC 02 (Abril 2026)/Fotos/Reunión informativa.JPG",
                "Reuniones/Reunion PAC 02 (Abril 2026)/Fotos/Seremi MOP y equipo de trabajo en estudio de diseño.jpg",
                "Reuniones/Reunion PAC 02 (Abril 2026)/Fotos/Temas en exposición.JPG"
            ],
            documents: [
                { name: "Acta PAC 02", url: "Reuniones/Reunion PAC 02 (Abril 2026)/Acta PAC 02 10-04-2026.doc" },
                { name: "Asistencia Reunión Seremi MOP", url: "Reuniones/Reunion PAC 02 (Abril 2026)/Asistencia reunión seremi Mop O_Higgins 10-04-2026.pdf" }
            ]
        },
        {
            _id: "m_jun",
            title: "Reunión Participación Ciudadana (PAC)",
            date: "2026-06-04T00:00:00",
            description: "<strong>Participación ciudadana en Rengo reunió a la comunidad para conocer los avances del Estudio de Diseño del Embalse Bollenar</strong><br><br>El pasado 4 de junio, en la comuna de Rengo, se desarrolló una nueva jornada de Participación Ciudadana en el marco del Estudio de Diseño del Embalse Bollenar, instancia que convocó a vecinos, regantes, autoridades y representantes de organizaciones locales para conocer los avances del proyecto y resolver inquietudes de la comunidad.<br><br>La actividad, impulsada como parte del proceso de participación contemplado en el estudio, permitió presentar el estado de avance de las distintas especialidades técnicas que se encuentran en desarrollo, además de informar sobre las campañas de terreno, estudios ambientales, geológicos e hidrológicos que contribuirán a definir el diseño definitivo de la futura infraestructura.<br><br>Durante la jornada, los asistentes pudieron conocer los objetivos del proyecto, los beneficios esperados para la seguridad hídrica del valle del río Claro y el fortalecimiento de la actividad agrícola de la zona, además de plantear consultas y observaciones que fueron respondidas por el equipo profesional a cargo del estudio.<br><br>El proceso de participación ciudadana constituye un componente fundamental del desarrollo del proyecto, ya que busca incorporar las opiniones de la comunidad, promover el diálogo transparente y mantener informados a los distintos actores del territorio sobre el avance de una iniciativa estratégica para la Región de O'Higgins.<br><br>El Embalse Bollenar forma parte de las obras priorizadas por el Ministerio de Obras Públicas para fortalecer la seguridad hídrica de la cuenca del río Claro. Actualmente, el proyecto se encuentra en su etapa de diseño, que contempla estudios técnicos, ambientales y actividades de participación ciudadana que se extenderán durante el desarrollo de la ingeniería de detalle.",
            images: [
                "Reuniones/Reunion PAC (Junio 2026)/Fotos/IMG_9655.webp",
                "Reuniones/Reunion PAC (Junio 2026)/Fotos/IMG_9661.webp",
                "Reuniones/Reunion PAC (Junio 2026)/Fotos/IMG_9672.webp",
                "Reuniones/Reunion PAC (Junio 2026)/Fotos/IMG_9674.webp",
                "Reuniones/Reunion PAC (Junio 2026)/Fotos/IMG_9675.webp",
                "Reuniones/Reunion PAC (Junio 2026)/Fotos/IMG_9676.webp",
                "Reuniones/Reunion PAC (Junio 2026)/Fotos/IMG_9677.webp",
                "Reuniones/Reunion PAC (Junio 2026)/Fotos/IMG_9678.webp",
                "Reuniones/Reunion PAC (Junio 2026)/Fotos/IMG_9681.webp",
                "Reuniones/Reunion PAC (Junio 2026)/Fotos/IMG_9696.webp",
                "Reuniones/Reunion PAC (Junio 2026)/Fotos/IMG_9697.webp"
            ],
            documents: [
                { name: "Comunicado de prensa", url: "Reuniones/Reunion PAC (Junio 2026)/Comunicado Reunión Pac 4 de junio.docx" }
            ]
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
        const upcomingContainer = document.getElementById('upcoming-meetings-list');
        const pastContainer = document.getElementById('past-meetings-list');
        
        if (upcomingContainer) upcomingContainer.innerHTML = '';
        if (pastContainer) pastContainer.innerHTML = '';
        
        const now = new Date();

        mockMeetings.forEach(meeting => {
            const meetingDate = new Date(meeting.date);
            const dateStr = meetingDate.toLocaleDateString('es-ES', {
                year: 'numeric', month: 'long', day: 'numeric'
            });

            // Generar HTML de Documentos (Formato Fichero)
            let documentsHtml = '';
            if (meeting.documents && meeting.documents.length > 0) {
                documentsHtml = `
                <div class="file-directory" style="margin-top: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid var(--border);">
                    <h4 style="font-size: 0.95rem; color: var(--text-dark); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                        📁 Archivos de la Reunión:
                    </h4>
                    <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                `;
                meeting.documents.forEach(doc => {
                    // Elegir ícono según extensión
                    let icon = '📄';
                    if (doc.url.endsWith('.pdf')) icon = '📕';
                    else if (doc.url.endsWith('.doc') || doc.url.endsWith('.docx')) icon = '📘';
                    else if (doc.url.endsWith('.mp4') || doc.url.includes('drive.google.com')) icon = '🎥';

                    documentsHtml += `
                        <li>
                            <a href="${doc.url}" class="file-link" target="_blank" style="display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: var(--primary); text-decoration: none; padding: 6px 10px; border-radius: 4px; transition: background 0.2s;">
                                <span>${icon}</span>
                                <span>${doc.name}</span>
                            </a>
                        </li>
                    `;
                });
                documentsHtml += `
                    </ul>
                </div>`;
            }

            let galleryHtml = '';
            if (meeting.images && meeting.images.length > 0) {
                galleryHtml = '<div class="meeting-gallery">';
                meeting.images.forEach((img, index) => {
                    if (index < 3) {
                        galleryHtml += `<a href="#" onclick="openLightbox('${meeting._id}', ${index}, event)"><img src="${img}" alt="${meeting.title}" class="gallery-img" loading="lazy" decoding="async"></a>`;
                    } else if (index === 3) {
                        if (meeting.images.length > 4) {
                            const extraCount = meeting.images.length - 4;
                            galleryHtml += `<a href="#" onclick="openLightbox('${meeting._id}', ${index}, event)" style="position: relative; display: block; overflow: hidden;">
                                <img src="${img}" alt="${meeting.title}" class="gallery-img" loading="lazy" decoding="async">
                                <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.2rem; border-radius: 8px;">+${extraCount} fotos</div>
                            </a>`;
                        } else {
                            galleryHtml += `<a href="#" onclick="openLightbox('${meeting._id}', ${index}, event)"><img src="${img}" alt="${meeting.title}" class="gallery-img" loading="lazy" decoding="async"></a>`;
                        }
                    }
                });
                galleryHtml += '</div>';
            } else {
                galleryHtml = `<div class="meeting-gallery"><a href="#" onclick="openLightbox('${meeting._id}', 0, event)"><img src="images/ubicacion_1.png" alt="${meeting.title}" class="gallery-img" loading="lazy" decoding="async"></a></div>`;
            }

            const cardHtml = `
                <div class="meeting-card animate-up">
                    ${galleryHtml}
                    <div class="meeting-info">
                        <div class="meeting-meta">
                            <span>📅 ${dateStr}</span>
                        </div>
                        <h3>${meeting.title}</h3>
                        <p class="meeting-desc clamp-text">${meeting.description}</p>
                        <span class="read-more-btn" onclick="toggleReadMore(this)" style="color: var(--primary); font-weight: 600; cursor: pointer; display: inline-block; margin-bottom: 20px; font-size: 0.9rem;">Ver más</span>
                        ${documentsHtml}
                    </div>
                </div>
            `;
            
            if (meetingDate < now) {
                if (pastContainer) pastContainer.innerHTML += cardHtml;
            } else {
                if (upcomingContainer) upcomingContainer.innerHTML += cardHtml;
            }
        });
        
        // Definir la función global para el botón Ver Más
        window.toggleReadMore = function(btn) {
            const p = btn.previousElementSibling;
            if (p.classList.contains('clamp-text')) {
                p.classList.remove('clamp-text');
                btn.textContent = 'Ver menos';
            } else {
                p.classList.add('clamp-text');
                btn.textContent = 'Ver más';
            }
        };

        // Show message if empty
        if (upcomingContainer && upcomingContainer.innerHTML.trim() === '') {
            upcomingContainer.innerHTML = '<p style="color: var(--text-muted); grid-column: 1 / -1;">No hay reuniones programadas por el momento.</p>';
        }
        if (pastContainer && pastContainer.innerHTML.trim() === '') {
            pastContainer.innerHTML = '<p style="color: var(--text-muted); grid-column: 1 / -1;">No hay reuniones pasadas registradas.</p>';
        }
    }

    // Initialize Lightbox HTML
    if (!document.getElementById('gallery-lightbox')) {
        const lightboxHtml = `
            <div id="gallery-lightbox" class="lightbox-overlay" onclick="closeLightbox(event)">
                <button class="lightbox-close" onclick="closeLightbox(event)">&times;</button>
                <button class="lightbox-prev" onclick="changeLightboxImage(-1, event)">&#10094;</button>
                <div class="lightbox-content">
                    <img id="lightbox-main-img" class="lightbox-img" src="" alt="Vista ampliada">
                </div>
                <button class="lightbox-next" onclick="changeLightboxImage(1, event)">&#10095;</button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHtml);
    }

// Lightbox Global State and Functions
let currentLightboxImages = [];
let currentLightboxIndex = 0;

window.openLightbox = function(meetingId, index, event) {
    event.preventDefault();
    const meeting = mockMeetings.find(m => m._id === meetingId);
    if (!meeting && meetingId !== 'default') return;
    
    currentLightboxImages = (meeting && meeting.images && meeting.images.length > 0) ? meeting.images : ["images/ubicacion_1.png"];
    currentLightboxIndex = index;
    
    updateLightboxImage();
    document.getElementById('gallery-lightbox').classList.add('active');
};

const sondajesImages = [
    "Reuniones/Fotos sondajes febrero 2026/IMG_8871.webp",
    "Reuniones/Fotos sondajes febrero 2026/IMG_8874.webp",
    "Reuniones/Fotos sondajes febrero 2026/IMG_8875.webp",
    "Reuniones/Fotos sondajes febrero 2026/IMG_8878.webp",
    "Reuniones/Fotos sondajes febrero 2026/IMG_8879.webp",
    "Reuniones/Fotos sondajes febrero 2026/IMG_8884.webp",
    "Reuniones/Fotos sondajes febrero 2026/IMG_8886.webp",
    "Reuniones/Fotos sondajes febrero 2026/IMG_8889.webp"
];

window.openSondajesLightbox = function(index, event) {
    event.preventDefault();
    currentLightboxImages = sondajesImages;
    currentLightboxIndex = index;
    updateLightboxImage();
    document.getElementById('gallery-lightbox').classList.add('active');
};

window.closeLightbox = function(event) {
    if (event && (event.target.id === 'lightbox-main-img' || event.target.classList.contains('lightbox-prev') || event.target.classList.contains('lightbox-next'))) {
        return;
    }
    document.getElementById('gallery-lightbox').classList.remove('active');
};

window.changeLightboxImage = function(direction, event) {
    if (event) event.stopPropagation();
    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) currentLightboxIndex = currentLightboxImages.length - 1;
    if (currentLightboxIndex >= currentLightboxImages.length) currentLightboxIndex = 0;
    updateLightboxImage();
};

function updateLightboxImage() {
    const imgEl = document.getElementById('lightbox-main-img');
    if (imgEl) {
        imgEl.src = currentLightboxImages[currentLightboxIndex];
    }
}

});
