---
layout: post
title: "Format Cheatsheet"
date: 2025-10-07 08:00:00
comments: false
categories: al
image: /images/formatcheatsheet/main.png
---
This is a **very quick cheatsheet** for all the different ***formats*** that you get out of **AL** using the **`Format()` function** with various ***format options.***

I've recently been trying to again find the format that returns the **GUID value** ***without the curly braces***, and as I didn't want to test all the options again, I finally created this **cheatsheet** for myself. Maybe it will be ***useful for you*** as well.

*Format 8* was omitted from this table as it produces no meaningful formatting for any data type.  

*Click* on any cell to *expand* and see the *full value*.

> ***Note:***  
> *Values marked with an **asterisk (*)** are **language dependent** and to make that obvious, I left them in Spanish.*

<style>
.format-table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 1.5em 0;
}
.format-table {
  border-collapse: collapse;
  width: 100%;
  min-width: 1000px;
  font-size: 0.85em;
  font-family: 'Courier New', Courier, monospace;
}
.format-table th,
.format-table td {
  border-bottom: 1px solid #ddd;
  padding: 10px 8px;
  text-align: left;
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.2s ease;
}
.format-table th {
  font-weight: 600;
  border-bottom: 2px solid #999;
  background: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.format-table th:first-child,
.format-table td:first-child {
  position: sticky;
  left: 0;
  background: white;
  font-weight: 500;
  z-index: 1;
  box-shadow: 2px 0 4px rgba(0,0,0,0.05);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  min-width: 90px;
  max-width: 90px;
}
.format-table th:first-child {
  z-index: 2;
}
.format-table td:not(:first-child) {
  cursor: pointer;
}
.format-table td.expanded {
  white-space: normal;
  word-break: break-all;
  max-width: none;
  background: #f0f7ff;
  position: relative;
}
.format-table td.expanded::before {
  content: '✕';
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 0.7em;
  color: #666;
  font-family: Arial, sans-serif;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const cells = document.querySelectorAll('.format-table td:not(:first-child)');
  cells.forEach(cell => {
    cell.addEventListener('click', function() {
      // Close all other expanded cells first
      cells.forEach(c => {
        if (c !== cell) c.classList.remove('expanded');
      });
      // Toggle current cell
      this.classList.toggle('expanded');
    });
  });
});
</script>

<div class="format-table-wrapper">
  <table class="format-table">
    <thead>
      <tr>
        <th>Data Type</th>
        <th>Format 0</th>
        <th>Format 1</th>
        <th>Format 2</th>
        <th>Format 3</th>
        <th>Format 4</th>
        <th>Format 5</th>
        <th>Format 6</th>
        <th>Format 7</th>
        <th>Format 9</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>DateTime</td>
        <td>10/07/25 02:30 PM</td>
        <td>10/07/25 02:30:52 PM</td>
        <td>10/07/25 02:30 PM</td>
        <td>10/07/25 02:30:52 PM</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>2025-10-07T11:30:52Z</td>
      </tr>
      <tr>
        <td>Date</td>
        <td>10/07/2025</td>
        <td>10/07/2025</td>
        <td>100725D</td>
        <td>25/10/07</td>
        <td>*Octubre 7, 2025</td>
        <td>100725</td>
        <td>251007</td>
        <td>*Oct 7, 2025</td>
        <td>07/10/2025</td>
      </tr>
      <tr>
        <td>Time</td>
        <td>2:30:52 PM</td>
        <td>2:30:52 PM</td>
        <td>143052T</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>14:30:52</td>
      </tr>
      <tr>
        <td>Guid</td>
        <td>{FDBEA7C4-9205-4A3A-998E-D7B020529BC1}</td>
        <td>{FDBEA7C4-9205-4A3A-998E-D7B020529BC1}</td>
        <td>{FDBEA7C4-9205-4A3A-998E-D7B020529BC1}</td>
        <td>FDBEA7C492054A3A998ED7B020529BC1</td>
        <td>FDBEA7C4-9205-4A3A-998E-D7B020529BC1</td>
        <td>(FDBEA7C4-9205-4A3A-998E-D7B020529BC1)</td>
        <td>{0XFDBEA7C4,0X9205,0X4A3A,{0X99,0X8E,0XD7,0XB0,0X20,0X52,0X9B,0XC1}}</td>
        <td>N/A</td>
        <td>{FDBEA7C4-9205-4A3A-998E-D7B020529BC1}</td>
      </tr>
      <tr>
        <td>Decimal</td>
        <td>1,234,567.89</td>
        <td>1234567.89</td>
        <td>1234567.89</td>
        <td>1,234,567.89</td>
        <td>1234567.89</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>1234567.89</td>
      </tr>
      <tr>
        <td>Boolean</td>
        <td>*Sí</td>
        <td>*Sí</td>
        <td>1</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>TRUE</td>
      </tr>
      <tr>
        <td>Option</td>
        <td>*Pedido abierto</td>
        <td>*Pedido abierto</td>
        <td>1</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>1</td>
      </tr>
      <tr>
        <td>Enum</td>
        <td>*Pedido abierto</td>
        <td>*Pedido abierto</td>
        <td>1</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>1</td>
      </tr>
      <tr>
        <td>Duration</td>
        <td>*1 hora 1 minuto 1 segundo</td>
        <td>*1 hora 1 minuto 1 segundo</td>
        <td>1 2 1 4 1 6</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>P0DT1H1M1.0S</td>
      </tr>
      <tr>
        <td>RecordId</td>
        <td>Frmt. Tst. Tbl.: 1</td>
        <td>Format Test Table: 1</td>
        <td>Frmt. Tst. Tbl.: 1</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>[MyCompany.Tables."Frmt. Tst. Tbl."]: 1</td>
      </tr>
      <tr>
        <td>DateFormula</td>
        <td>*1T+2D</td>
        <td>*1T+2D</td>
        <td>&lt;1Q+2D&gt;</td>    
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>1Q+2D</td>
      </tr>
    </tbody>
  </table>
</div>

