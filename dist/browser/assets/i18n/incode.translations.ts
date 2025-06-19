const es = {
  captureInstructions: {
    step1: '1. Coloca la documento dentro del marco',
    step2: '2. Presiona el botón para tomar la foto',
  },
  commonIssues: {
    infoNotReadable: 'Información ilegible',
    minimizeShake: 'Evita que la cámara se mueva sosteniendo el teléfono firmemente.',
    takeManually: 'Tomar la foto manualmente',
    tryAgain: 'Ok, intentar de nuevo',
  },
  idv2: {
    capture: {
      dontMove: 'No muevas tu documento por unos segundos',
      fillFrameFront: 'Alinea tu documento dentro del recuadro',
      fillFrameBack: 'Alinea tu documento dentro del recuadro',
      notifications: {
        blur: {
          title: 'Documento muy borroso',
        },
        glare: {
          description: 'Busca una mejor iluminación para evitar los brillos',
          title: 'Documento con reflejos',
        },
        notAligned: {
          description: 'Centra tu documento dentro del marco',
          title: 'El documento no está alineado',
        },
      },
      processing: {
        tryAgain: 'Inténtar de nuevo',
        scanBack: 'Continuar',
        successBackSubtitle: 'Vamos a continuar',
        successTitle: 'Tu información se procesó correctamente!',
        successFrontSubtitle: 'Ahora vamos a capturar el reverso',
        errors: {
          glare: {
            subtitle: 'Inclina el documento para minimizar el brillo',
            title: 'Hay brillo en el documento',
          },
          sharpness: {
            subtitle:
              'La imagen está borrosa. Ajusta la distancia del documento hasta que se enfoque.',
            title: 'Imagen borrosa detectada',
          },
          wrongSide: {
            title: 'Lado del documento incorrecto',
          },
        },
      },
      takingPhoto: 'Capturando imagen...',
    },
    flipAnimation: {
      title: 'Muestre el reverso de tu documento',
    },
    permissions: {
      description: 'Es necesario para completar el proceso',
      subtitle: 'acceder a la cámara',
      title: 'Necesitamos permisos para',
    },
    tutorial: {
      subtitle: 'Asegúrate de que el documento sea legible',
      startScan: 'Captura documento',
      title: 'Escanea tu documento de identidad',
    },
  },
  redirect: {
    scanQrTitle: 'Recomendaciones importantes para escanear el QR:',
    scanQrParagraph1: 'Utiliza la cámara de tu dispositivo móvil, al escanear el QR abre el link.',
    scanQrParagraph2: 'Es recomendable utilizar Safari en IOS y Chrome en Andrioid.',
    scanQrParagraph3:
      'Si lo escaneas con una app, copia la URL y ábrela en los navegadores recomendados.',
  },
  notifications: {
    getReady: 'Mira a la cámara para verificar que eres tú',
    glareDetected: 'Reflejo detectado',
    glareDetectedDescription:
      'Inclina ligeramente el documento hacia arriba o hacia abajo para reducir el reflejo.',
    lowSharpness: 'Imagen borrosa',
    lowSharpnessDescription: 'Acerca o aleja el documento hasta que la imagen esté enfocada.',
  },
  tutorial: {
    ageAssurance3:
      'Mantén una expresión neutral, busca una luz equilibrada y quítate gafas y sombreros',
    selfie1: 'Vamos a tomarte una selfie',
  },
  selfie: {
    look: 'Mira a la cámara para verificar que eres tú',
  },
};

export default es;
