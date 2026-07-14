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
            date: "2024-05-15T10:00:00",
            description: "Presentación inicial del proyecto a la comunidad, donde se resolvieron dudas generales sobre el diseño y ubicación del embalse Bollenar.",
            images: [
                "Reuniones/Reunion 1/Fotos/images (1).jpg",
                "Reuniones/Reunion 1/Fotos/not7-30032021.jpg",
                "Reuniones/Reunion 1/Fotos/ubicacion_1.png",
                "Reuniones/Reunion 1/Fotos/ubicacion_2.png"
            ],
            documents: [
                { name: "Comunicado Reunión 1", url: "Reuniones/Reunion 1/Comuicado reunion1.docx" },
                { name: "Comunicado: Embalse Bollenar Avanza", url: "Reuniones/Reunion 1/Comunicado_ Embalse Bollenar avanza_fue.docx" }
            ]
        },
        {
            _id: "m_feb",
            title: "Reunión de Comunicaciones",
            date: "2026-02-20T10:00:00",
            description: "Reunión de coordinación y estrategia de comunicaciones del proyecto.",
            images: [],
            documents: [
                { name: "Acta de reunión 20 febrero", url: "Reuniones/Reunion Comunicaciones (Febrero 2026)/Acta de reunión 20 febrero. Comunicaciones .pdf" }
            ]
        },
        {
            _id: "m_apr",
            title: "Reunión Seremi MOP O'Higgins y PAC 02",
            date: "2026-04-10T10:00:00",
            description: "Reunión de trabajo con el Seremi del MOP y segunda etapa de Participación Ciudadana (PAC 02).",
            images: [],
            documents: [
                { name: "Acta PAC 02", url: "Reuniones/Reunion PAC 02 (Abril 2026)/Acta PAC 02 10-04-2026.doc" },
                { name: "Asistencia Reunión Seremi MOP", url: "Reuniones/Reunion PAC 02 (Abril 2026)/Asistencia reunión seremi Mop O_Higgins 10-04-2026.pdf" }
            ]
        },
        {
            _id: "m_jun",
            title: "Reunión Participación Ciudadana (PAC)",
            date: "2026-06-04T10:00:00",
            description: "Actividad de participación ciudadana y presentación de vocativos del proyecto.",
            images: [],
            documents: [
                { name: "Programa y Vocativos PAC", url: "Reuniones/Reunion PAC (Junio 2026)/Programa y Vocativos PAC 04-06-2026.docx" }
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
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
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
                    galleryHtml += `<a href="#" onclick="openLightbox('${meeting._id}', ${index}, event)"><img src="${img}" alt="${meeting.title}" class="gallery-img"></a>`;
                });
                galleryHtml += '</div>';
            } else {
                galleryHtml = `<div class="meeting-gallery"><a href="#" onclick="openLightbox('${meeting._id}', 0, event)"><img src="images/ubicacion_1.png" alt="${meeting.title}" class="gallery-img"></a></div>`;
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
