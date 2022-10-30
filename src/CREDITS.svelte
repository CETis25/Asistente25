<script>
    import DIV from './DIV.svelte';
    import CONT from './CONT.svelte';
    import SMTITLE from './SMTITLE.svelte';
    import SUBTITLE from './SUBTITLE.svelte';
    import FOUNDERS from './FOUNDERS.svelte';
    import { fade } from 'svelte/transition';
</script>
<div class="bg-white rounded-lg" in:fade>
  <DIV>Asistente virtual exclusivo para alumnos de CETis 25</DIV>
  <SMTITLE>Bienvenido/a.</SMTITLE>
  <CONT>Es un placer tenerte de vuelta en el sitio web del asistente virtual del plantel.</CONT>
  <SMTITLE>Acerca del asistente.</SMTITLE>
  <CONT>Este asistente está diseñado para dar solución a tus dudas, así como permitir a los profesores mejorar sus conocimientos de manera progresiva. Siéntete libre de conversar.</CONT>
  <br>
  <SMTITLE>¿Quiénes somos?</SMTITLE>
  <CONT>El <i><b>C</b>entro de <b>E</b>studios <b>T</b>ecnológicos <b>i</b>ndustrial y de <b>s</b>ervicios número <b>25</b></i> es el plantel con carreras técnicas a nivel bachillerato por excelencia en la ciudad de Tecate.</CONT>
  <SUBTITLE><p class="text-center">Fundadores del asistente virtual</p></SUBTITLE>
  <div class="text-center space-x-6 h-auto">
		<FOUNDERS source={'./img/david.jpg'}>David Emmanuel Santana Romero</FOUNDERS>
        <FOUNDERS source={'./img/ramos.jfif'}>Guadalupe Ramos Mejía</FOUNDERS>
	</div>
	<CONT>
        <ul>
		      <li><b>David Emmanuel Santana Romero:</b> Estudiante de CETis 25, 5to semestre de Electrónica. Responsable de la programación del proyecto.</li>
              <li><b>Guadalupe Ramos Mejía:</b> Licenciado en Ciencias Físicas por el Instituto Tecnológico de Monterrey. Profesor en el área de Física en CETis 25 por más de 35 años, también de la Universidad Autónoma de Baja California y del Instituto Tecnológico de Monterrey. Autor y asesor en los concursos de Prototipos de la DGETI y ExpoCiencias por más de 10 años. Responsable del Club de Ciencias en CETis 25.</li>
        </ul>
	</CONT>
</div>
