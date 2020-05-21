<?php
/*
* @package wooCommerce-product-carousel
*/

if (!defined('ABSPATH')) {
    die;
}

class Dashboard
{
    /**
     * Holds the values to be used in the fields callbacks
     */
    private $options;

    /**
     * Start up
     */
    public function __construct()
    {
        add_action('admin_menu', array($this, 'add_plugin_page'));
        add_action('admin_init', array($this, 'page_init'));
    }

    /**
     * Add options page
     */
    public function add_plugin_page()
    {
        // This page will be under "Settings"
        add_menu_page(
            __('Woo Product Carousel', 'wooCommerce-product-carousel'),
            __('Woo Product Carousel', 'wooCommerce-product-carousel'),
            'manage_options',
            'wooCommerce-product-carousel',
            array($this, 'create_admin_page'),
            'dashicons-slides',
            56
        );
    }

    /**
     * Options page callback
     */
    public function create_admin_page()
    {
        // Set class property
        $this->options = get_option('woo_product_carousel');
?>
        <div class="wrap">
            <h1>WooCommerce Product Carousel</h1>
            <form method="post" action="options.php">
                <?php
                // This prints out all hidden setting fields
                settings_fields('woo_product_carousel_group');
                do_settings_sections('wooCommerce-product-carousel');
                submit_button();
                ?>
            </form>
        </div>
<?php
    }

    /**
     * Register and add settings
     */
    public function page_init()
    {
        register_setting(
            'woo_product_carousel_group', // Option group
            'woo_product_carousel', // Option name
            array($this, 'sanitize') // Sanitize
        );

        add_settings_section(
            'setting_section_id', // ID
            '<div class="notice notice-info">
            <h2>Shortcode</h2>
             <p>Use this shortcode <b>[product-carousel]</b> to display the Product Carousel anywhere you like. (for better appearance you would need a full width page template.)</p>
         </div>', // Title
            array($this, 'print_section_info'), // Callback
            'wooCommerce-product-carousel' // Page
        );

        add_settings_field(
            'button_name',
            'Button Name',
            array($this, 'button_name_callback'),
            'wooCommerce-product-carousel',
            'setting_section_id'
        );

        add_settings_field(
            'categorychoice',
            'Category Choice',
            array($this, 'categorychoice_callback'),
            'wooCommerce-product-carousel',
            'setting_section_id'
        );

        add_settings_field(
            'giftchoice',
            'Gift Category Choice',
            array($this, 'giftchoice_callback'),
            'wooCommerce-product-carousel',
            'setting_section_id'
        );
    }

    /**
     * Sanitize each setting field as needed
     *
     * @param array $input Contains all settings fields as array keys
     */
    public function sanitize($input)
    {
        $new_input = array();

        if (isset($input['button_name']))
            $new_input['button_name'] = sanitize_text_field($input['button_name']);

        if (isset($input['categorychoice']))
            $new_input['categorychoice'] = array_map('sanitize_text_field', wp_unslash($input['categorychoice']));

        if (isset($input['giftchoice']))
            $new_input['giftchoice'] = array_map('sanitize_text_field', wp_unslash($input['giftchoice']));



        return $new_input;
    }

    /** 
     * Print the Section text
     */
    public function print_section_info()
    {
        print '<a target="_blank" class="button-secondary" href="mailto:rafi@haidari.co">Ask For Help</a>';
    }

    /** 
     * Get the settings option array and print one of its values
     */
    public function categorychoice_callback()
    {
        $taxonomy     = 'product_cat';
        $orderby      = 'name';
        $show_count   = 0;      // 1 for yes, 0 for no
        $pad_counts   = 0;      // 1 for yes, 0 for no
        $hierarchical = 1;      // 1 for yes, 0 for no  
        $title        = '';
        $empty        = 0;

        $args = array(
            'taxonomy'     => $taxonomy,
            'orderby'      => $orderby,
            'show_count'   => $show_count,
            'pad_counts'   => $pad_counts,
            'hierarchical' => $hierarchical,
            'title_li'     => $title,
            'hide_empty'   => $empty
        );
        $all_categories = get_categories($args);

        $style = "min-width: 300px;
        min-height: 115px;
        border-radius: 0;
        border: 1px solid #007cba;";

        echo '<select multiple="multiple" id="categorychoice" style="' . $style . '" name="woo_product_carousel[categorychoice][]">';

        foreach ($all_categories as $category) {
            $selected = in_array($category->cat_name, $this->options['categorychoice']) ? ' selected="selected" ' : '';
            echo '<option value="' . $category->cat_name . '" ' . $selected . '>';
            echo $category->cat_name . ' (' . $category->category_count . ')';
            echo '</option>';
        }
        echo '</select>';
    }

    public function giftchoice_callback()
    {
        $taxonomy     = 'product_cat';
        $orderby      = 'name';
        $show_count   = 0;      // 1 for yes, 0 for no
        $pad_counts   = 0;      // 1 for yes, 0 for no
        $hierarchical = 1;      // 1 for yes, 0 for no  
        $title        = '';
        $empty        = 0;

        $args = array(
            'taxonomy'     => $taxonomy,
            'orderby'      => $orderby,
            'show_count'   => $show_count,
            'pad_counts'   => $pad_counts,
            'hierarchical' => $hierarchical,
            'title_li'     => $title,
            'hide_empty'   => $empty
        );
        $all_categories = get_categories($args);

        $style = "min-width: 300px;
        min-height: 115px;
        border-radius: 0;
        border: 1px solid #007cba;";

        echo '<select multiple="multiple" id="giftchoice" style="' . $style . '" name="woo_product_carousel[giftchoice][]">';

        foreach ($all_categories as $category) {
            $selected = in_array($category->cat_name, $this->options['giftchoice']) ? ' selected="selected" ' : '';
            echo '<option value="' . $category->cat_name . '" ' . $selected . '>';
            echo $category->cat_name . ' (' . $category->category_count . ')';
            echo '</option>';
        }
        echo '</select>';
    }

    /** 
     * Get the settings option array and print one of its values
     */
    public function button_name_callback()
    {
        $style = "min-width: 300px;
        border-radius: 0;
        border: 1px solid #007cba;";

        printf(
            '<input type="text" id="button_name" style="' . $style . '" name="woo_product_carousel[button_name]" value="%s" />',
            isset($this->options['button_name']) ? esc_attr($this->options['button_name']) : ''
        );
    }
}
