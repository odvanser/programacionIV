<?php 
include('../../config/config.php');
$materia = new materia($conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$materia->$proceso( $_GET['materia'] );
print_r(json_encode($materia->respuesta));

class materia{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];
    
    public function __construct($db){
        $this->db=$db;
    }
    public function recibirDatos($materia){
        $this->datos = json_decode($materia, true);
        $this->validar_datos();
    }
    private function validar_datos(){
        if( empty($this->datos['codigo']) ){
            $this->respuesta['msg'] = 'por favor ingrese el Código';
        }
        if( empty($this->datos['nombre']) ){
            $this->respuesta['msg'] = 'por favor ingrese el Nombre';
        }
        if( empty($this->datos['modalidad']) ){
            $this->respuesta['msg'] = 'por favor ingrese la Modalidad';
        }

        $this->almacenar_docente();
    }
    private function almacenar_docente(){
        if( $this->respuesta['msg']==='correcto' ){
            if( $this->datos['accion']==='nuevo' ){
                $this->db->consultas('
                    INSERT INTO materias (codigo,nombre,modalidad,informacion) VALUES(
                        "'. $this->datos['codigo'] .'",
                        "'. $this->datos['nombre'] .'",
                        "'. $this->datos['modalidad'] .'",
                        "'. $this->datos['informacion'] .'"
                    )
                ');
                $this->respuesta['msg'] = 'Registro insertado correctamente';
            } else if( $this->datos['accion']==='modificar' ){
                $this->db->consultas('
                    UPDATE materias SET
                        codigo      = "'. $this->datos['codigo'] .'",
                        nombre      = "'. $this->datos['nombre'] .'",
                        modalidad   = "'. $this->datos['modalidad'] .'",
                        informacion    = "'. $this->datos['informacion'] .'"
                    WHERE idMateria = "'. $this->datos['idMateria'] .'"
                ');
                $this->respuesta['msg'] = 'Registro actualizado correctamente';
            }
        }
    }
    public function buscarMateria($valor = ''){
        $this->db->consultas('
            select materias.idMateria, materias.codigo, materias.nombre, materias.modalidad, materias.informacion
            from materias
            where materias.codigo like "%'. $valor .'%" or materias.nombre like "%'. $valor .'%" or materias.modalidad like "%' . $valor .'%"
        ');
        return $this->respuesta = $this->db->obtener_data();
    }
    public function eliminarMateria($idMateria = 0){
        $this->db->consultas('
            DELETE materias
            FROM materias
            WHERE materias.idMateria="'.$idMateria.'"
        ');
        return $this->respuesta['msg'] = 'Registro eliminado correctamente';
    }
}
?>