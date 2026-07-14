// MOCK DATA PARA ADMIN STATIC
window.currentStages = [
    { _id: 's1', stageId: 1, title: "Evaluación Preliminar", description: "Evaluación preliminar de viabilidad técnica y económica.", status: "completed" },
    { _id: 's2', stageId: 2, title: "Desarrollo de Diseños", description: "Se desarrollan y optimizan los diseños para determinar los costos y beneficios esperados y la mejor alternativa de proyecto.", status: "completed" },
    { _id: 's3', stageId: 3, title: "Planos y Detalles", description: "Se realizan los planos de detalles constructivos y documentación para la construcción.", status: "active" },
    { _id: 's4', stageId: 4, title: "Calificación Ambiental", description: "Obtención de la Resolución de Calificación Ambiental favorable para el proyecto.", status: "pending" },
    { _id: 's5', stageId: 5, title: "Construcción", description: "Materialización de las Obras.", status: "pending" },
    { _id: 's6', stageId: 6, title: "Operación", description: "Puesta en Operación y mantención del embalse.", status: "pending" }
];

window.currentMeetings = [
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

document.addEventListener('DOMContentLoaded', () => {
    // Fake Login
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        // Login simulado siempre exitoso
        localStorage.setItem('token', 'fake-static-token');
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('dashboard').style.display = 'flex';
        loadTimeline();
        loadMeetings();
    });

    // Check auth
    if (localStorage.getItem('token')) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('dashboard').style.display = 'flex';
        loadTimeline();
        loadMeetings();
    }

    // El enrutamiento de pestañas se maneja mediante window.showTab()

    // Logout
    const doLogout = () => {
        localStorage.removeItem('token');
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('login-section').style.display = 'flex';
    };

    document.getElementById('logout-btn').addEventListener('click', doLogout);
    
    if (document.getElementById('logout-btn-mobile')) {
        document.getElementById('logout-btn-mobile').addEventListener('click', doLogout);
    }

    // Modal de Reuniones Fake Submit (Edit)
    document.getElementById('edit-meeting-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        alert('Guardado simulado exitoso (Versión Estática)');
        closeEditModal();
    });

    // Formulario de Crear Reunión Fake Submit
    document.getElementById('meeting-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        alert('Reunión creada exitosamente (Versión Estática)');
        e.target.reset();
    });

    // Modal de Etapas Fake Submit
    document.getElementById('stage-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        alert('Etapa simulada guardada (Versión Estática)');
        closeStageModal();
    });
});

// Cargar Reuniones
function loadMeetings() {
    const tbody = document.getElementById('meetings-list');
    tbody.innerHTML = '';

    window.currentMeetings.forEach(m => {
        const date = new Date(m.date).toLocaleDateString();
        const hasImg = m.imageUrl ? 'Sí' : 'No';
        const hasPdf = m.pdfUrl ? 'Sí' : 'No';

        tbody.innerHTML += `
            <tr>
                <td data-label="Fecha">${date}</td>
                <td data-label="Título"><strong>${m.title}</strong></td>
                <td data-label="Archivos">Img: ${hasImg} | PDF: ${hasPdf}</td>
                <td data-label="Acciones">
                    <button class="btn btn-primary" style="margin-right:5px;" onclick="openEditModal('${m._id}')">Editar</button>
                    <button class="btn btn-danger" onclick="deleteMeeting('${m._id}')">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Cargar Timeline
function loadTimeline() {
    const container = document.getElementById('stages-list');
    container.innerHTML = '';
    
    window.currentStages.forEach(stage => {
        container.innerHTML += `
            <tr>
                <td data-label="Orden"><strong>${stage.stageId}</strong></td>
                <td data-label="Etapa">
                    <strong>${stage.title}</strong>
                    <div style="font-size:0.85rem; color:var(--text-muted); max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${stage.description || 'Sin descripción'}
                    </div>
                </td>
                <td data-label="Estado">${getStatusLabel(stage.status)}</td>
                <td data-label="Acciones">
                    <button class="btn btn-primary" style="margin-right:5px; padding: 6px 12px; font-size: 0.85rem;" 
                        onclick="openStageModal('${stage._id}')">Editar</button>
                    <button class="btn btn-danger" onclick="deleteStage('${stage._id}')">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Helpers
function getStatusLabel(status) {
    const labels = {
        'pending': '<span style="color:#f59e0b; font-weight:bold;">Pendiente</span>',
        'active': '<span style="color:#3b82f6; font-weight:bold;">En Curso</span>',
        'completed': '<span style="color:#10b981; font-weight:bold;">Completado</span>'
    };
    return labels[status] || status;
}

// Navegación Sidebar
window.showTab = function(tabName, element) {
    // Quitar active a todos
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    
    // Poner active al elemento seleccionado
    if(element) element.classList.add('active');
    
    // Mostrar tab correcto
    const targetId = tabName + '-tab';
    const targetElement = document.getElementById(targetId);
    if(targetElement) targetElement.classList.add('active');
}

// MODAL REUNIONES
window.openEditModal = function(id) {
    const m = window.currentMeetings.find(x => x._id === id);
    if (!m) return;

    document.getElementById('edit-id').value = m._id;
    document.getElementById('edit-title').value = m.title;
    
    const dp = new Date(m.date);
    document.getElementById('edit-date').value = dp.toISOString().split('T')[0];
    document.getElementById('edit-desc').value = m.description || '';

    // Manejo visual de archivos existentes
    const imgStatus = document.getElementById('edit-img-status');
    if (m.imageUrl) {
        imgStatus.style.display = 'inline-block';
        imgStatus.innerHTML = `✅ Imagen actual: <a href="${m.imageUrl}" target="_blank">Ver</a>`;
    } else {
        imgStatus.style.display = 'none';
    }

    const pdfStatus = document.getElementById('edit-pdf-status');
    if (m.pdfUrl) {
        pdfStatus.style.display = 'inline-block';
        pdfStatus.innerHTML = `✅ PDF actual: <a href="${m.pdfUrl}" target="_blank">Ver</a>`;
    } else {
        pdfStatus.style.display = 'none';
    }

    document.getElementById('edit-modal').classList.add('active');
}

window.closeEditModal = function() {
    document.getElementById('edit-modal').classList.remove('active');
}

window.deleteMeeting = async function(id) {
    if (confirm('¿Seguro que deseas eliminar esta reunión? (Simulado)')) {
        alert('Reunión eliminada (Versión estática)');
    }
}

// MODAL ETAPAS
window.openStageModal = function(id = null) {
    const modal = document.getElementById('stage-modal');
    const form = document.getElementById('stage-form');
    const titleEl = document.getElementById('stage-modal-title');
    
    form.reset();
    document.getElementById('stage-id').value = '';

    if (id) {
        titleEl.textContent = 'Editar Etapa';
        const stage = window.currentStages.find(s => s._id === id);
        if (stage) {
            document.getElementById('stage-id').value = stage._id;
            document.getElementById('stage-order').value = stage.stageId;
            document.getElementById('stage-title-input').value = stage.title;
            document.getElementById('stage-desc').value = stage.description || '';
            document.getElementById('stage-status').value = stage.status;
        }
    } else {
        titleEl.textContent = 'Agregar Etapa';
        const nextOrder = window.currentStages.length > 0 
            ? Math.max(...window.currentStages.map(s => s.stageId)) + 1 
            : 1;
        document.getElementById('stage-order').value = nextOrder;
    }
    
    modal.classList.add('active');
}

window.closeStageModal = function() {
    document.getElementById('stage-modal').classList.remove('active');
}

window.deleteStage = async function(id) {
    if (confirm('¿Seguro que deseas eliminar esta etapa permanentemente? (Simulado)')) {
        alert('Etapa eliminada (Versión estática)');
    }
}
