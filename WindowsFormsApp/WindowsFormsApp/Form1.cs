using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Windows.Forms.VisualStyles;

namespace WindowsFormsApp
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            const int sum = 15;
            var mes = sum / 2;

            label1.Text = mes.ToString();
        }

        private void label1_Click(object sender, EventArgs e)
        {
            label1.Text = @"0";
        }
    }
}
