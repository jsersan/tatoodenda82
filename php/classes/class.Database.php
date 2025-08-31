<?php
declare(strict_types=1);

header('Access-Control-Allow-Origin: *');

// ======================================================
// Clase: class.Database.php
// Funcion: Se encarga del manejo con la base de datos
// Descripcion: Tiene varias funciones muy útiles para
//              el manejo de registros.
// 
// Ultima Modificación: Actualizado para PHP 8.2
// ======================================================

class Database {

    
    private $_connection;
    
    /*private $_host = 'localhost:8889';
    private $_db   = 'tatoodenda';
    private $_user = 'root';
    private $_pass = 'root';
    */
    private $_host = 'qamn130.txemaserrano.com';
    private $_db   = 'qamn130';
    private $_user = 'qamn130';
    private $_pass = 'Jss12aoz';

    // Almacenar una unica instancia
    private static $_instancia = null;

    // ================================================
    // Metodo para obtener instancia de base de datos
    // ================================================
    public static function getInstancia(): self {
        if (self::$_instancia === null) {
            self::$_instancia = new self();
        }
        return self::$_instancia;
    }

    // ================================================
    // Constructor de la clase Base de datos
    // ================================================
    public function __construct() {
        $this->_connection = new mysqli(
            $this->_host,
            $this->_user,
            $this->_pass,
            $this->_db
        );

        // Manejar error en base de datos
        if ($this->_connection->connect_error) {
            trigger_error('Falla en la conexión de base de datos: ' . $this->_connection->connect_error, E_USER_ERROR);
        }
    }

    // Metodo vacio __close para evitar duplicacion
    private function __close(): void {}

    // Metodo para obtener la conexion a la base de datos
    public function getConnection(): mysqli {
        $this->_connection->set_charset("utf8");
        return $this->_connection;
    }

    // Metodo que revisa el String SQL
    private static function es_string(string $sql): bool {
        if (!is_string($sql)) {
            trigger_error('class.Database.inc: $SQL enviado no es un string: ' . $sql);
            return false;
        }
        return true;
    }

    // ==================================================
    // Funcion que ejecuta el SQL y retorna un ROW
    //    Esta funcion esta pensada para SQLs, 
    //    que retornen unicamente UNA sola línea
    // ==================================================
    public static function get_Row(string $sql): array {
        if (!self::es_string($sql)) {
            exit();
        }

        $db = self::getInstancia();
        $mysqli = $db->getConnection();
        $resultado = $mysqli->query($sql);

        if ($resultado && $row = $resultado->fetch_assoc()) {
            return $row;
        } else {
            return [];
        }
    }

    // ==================================================
    // Funcion que ejecuta el SQL y retorna un CURSOR
    //    Esta funcion esta pensada para SQLs, 
    //    que retornen multiples lineas (1 o varias)
    // ==================================================
    public static function get_Cursor(string $sql): mysqli_result|false {
        if (!self::es_string($sql)) {
            exit();
        }

        $db = self::getInstancia();
        $mysqli = $db->getConnection();

        return $mysqli->query($sql);
    }

    // ==================================================
    // Funcion que ejecuta el SQL y retorna un jSon
    // data: [{...}] con N cantidad de registros
    // ==================================================
    public static function get_json_rows(string $sql): string {
        if (!self::es_string($sql)) {
            exit();
        }

        $db = self::getInstancia();
        $mysqli = $db->getConnection();

        $resultado = $mysqli->query($sql);

        // Si hay un error en el SQL, este es el error de MySQL
        if (!$resultado) {
            return "class.Database.class: error " . $mysqli->error;
        }

        $registros = [];

        while ($row = $resultado->fetch_assoc()) {
            $registros[] = $row;
        }
        
        return json_encode($registros);
    }

    // ==================================================
    // Funcion que ejecuta el SQL y retorna un Arreglo
    // ==================================================
    public static function get_arreglo(string $sql): array {
        if (!self::es_string($sql)) {
            exit();
        }

        $db = self::getInstancia();
        $mysqli = $db->getConnection();

        $resultado = $mysqli->query($sql);

        // Si hay un error en el SQL, este es el error de MySQL
        if (!$resultado) {
            return ["error" => "class.Database.class: error " . $mysqli->error];
        }

        $registros = [];

        while ($row = $resultado->fetch_assoc()) {
            $registros[] = $row;
        }
        
        return $registros;
    }

    // ==================================================
    // Funcion que ejecuta el SQL y retorna un jSon
    // de una sola linea. Ideal para imprimir un
    // Query que solo retorne una linea
    // ==================================================
    public static function get_json_row(string $sql): string {
        if (!self::es_string($sql)) {
            exit();
        }

        $db = self::getInstancia();
        $mysqli = $db->getConnection();

        $resultado = $mysqli->query($sql);

        // Si hay un error en el SQL, este es el error de MySQL
        if (!$resultado) {
            return "class.Database.class: error " . $mysqli->error;
        }

        if (!$row = $resultado->fetch_assoc()) {
            return "{}";
        }
        
        return json_encode($row);
    }

    // ====================================================================
    // Funcion que ejecuta el SQL y retorna un valor
    // Ideal para count(*), Sum, cosas que retornen una fila y una columna
    // ====================================================================
    public static function get_valor_query(string $sql, string $columna): mixed {
        if (!self::es_string($sql)) {
            exit();
        }

        $db = self::getInstancia();
        $mysqli = $db->getConnection();

        $resultado = $mysqli->query($sql);

        // Si hay un error en el SQL, este es el error de MySQL
        if (!$resultado) {
            return "class.Database.class: error " . $mysqli->error;
        }

        $valor = null;
        
        // Trae el primer valor del arreglo
        if ($row = $resultado->fetch_assoc()) {
            $valor = $row[$columna] ?? null;
        }

        return $valor;
    }

    // ====================================================================
    // Funcion que ejecuta el SQL de inserción, actualización y eliminación
    // ====================================================================
    public static function ejecutar_idu(string $sql): string|int {
        if (!self::es_string($sql)) {
            exit();
        }

        $db = self::getInstancia();
        $mysqli = $db->getConnection();

        if (!$resultado = $mysqli->query($sql)) {
            return "class.Database.class: error " . $mysqli->error;
        }
        
        return $mysqli->insert_id ?: 1;
    }

    // ====================================================================
    // Funciones para encriptar y desencriptar data: 
    //    crypt_blowfish_bydinvaders
    // ====================================================================
    public function crypt(string $aEncriptar, int $digito = 7): string {
        $set_salt = './1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        $salt = sprintf('$2a$%02d$', $digito);
        
        for ($i = 0; $i < 22; $i++) {
            $salt .= $set_salt[mt_rand(0, 22)];
        }
        
        return crypt($aEncriptar, $salt);
    }

    public function uncrypt(string $evaluar, string $contra): bool {
        return hash_equals(crypt($evaluar, $contra), $contra);
    }
}
?>