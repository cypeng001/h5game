# -*- coding: utf-8 -*-

import sys
import xlrd

CTYPE_EMPTY = 0
CTYPE_STRING = 1
CTYPE_NUMBER = 2
CTYPE_DATE = 3
CTYPE_BOOLEAN = 4
CTYPE_ERROR = 5

DATA_TYPE_INT = 1
DATA_TYPE_STRING = 2

STR_2_DATA_TYPE = {
    'int': DATA_TYPE_INT,
    'string': DATA_TYPE_STRING,
}

SRC_DIR = '../rawres/xlsx/'
CLIENT_EXPORT_DIR = '../resource/config/data/'
SERVER_EXPORT_DIR = '../rawres/xlsx/export/server/'

ROW_BASE = 5
COL_BASE = 1

DATA_TYPE_ROW_INDEX = 1
DATA_CS_EXPORT_ROW_INDEX = 2
DATA_NAME_ROW_INDEX = 3
DATA_NAME_ZH_ROW_INDEX = 4

TAB_STR = '    '
CR_STR = '\n'

def printAll(sheet):
    for row in range(sheet.nrows):
        for col in range(sheet.ncols):
            cell = sheet.cell(row, col)
            print 'sheet.cell', row, col, cell, cell.ctype, cell.value
            if cell.ctype == CTYPE_NUMBER:
                print 'sheet.val number', type(cell.value), cell.value
            elif cell.ctype == CTYPE_STRING:
                print 'sheet.val string', type(cell.value), cell.value

def parseDataBase(sheet, rowIndex):
    ret = []
    for col in range(COL_BASE, sheet.ncols):
        cell = sheet.cell(rowIndex, col)
        ret.append(cell.value)
    return ret

def parseDataType(sheet):
    ret = parseDataBase(sheet, DATA_TYPE_ROW_INDEX)
    for k in range(len(ret)):
        ret[k] = STR_2_DATA_TYPE[ret[k]]
    return ret

def parseCSExport(sheet):
    return parseDataBase(sheet, DATA_CS_EXPORT_ROW_INDEX)

def parseDataName(sheet):
    return parseDataBase(sheet, DATA_NAME_ROW_INDEX)

def parseDataNameZH(sheet):
    return parseDataBase(sheet, DATA_NAME_ZH_ROW_INDEX)

def parseData(sheet):
    ret = []
    for row in range(ROW_BASE, sheet.nrows):
        rowData = []
        ret.append(rowData)
        for col in range(COL_BASE, sheet.ncols):
            cell = sheet.cell(row, col)
            dataValue = cell.value
            rowData.append(dataValue)

    return ret

def exportCCellVal(fo, dataType, dataVal):
    if dataType == DATA_TYPE_INT:
        fo.write(str(int(dataVal)))
    elif dataType == DATA_TYPE_STRING:
        fo.write('"' + str(dataVal) + '"')

def exportClient(exportPath, datas, dataNameList, dataTypeList):
    fo = open(exportPath, 'w')

    fo.write('{' + CR_STR)
    
    for row in range(len(datas)):
        rowData = datas[row]
        dataId = rowData[0]
        fo.write(TAB_STR + '"' + str(int(dataId)) + '": {' + CR_STR)

        for col in range(1, len(dataNameList)):
            dataName = dataNameList[col]
            dataType = dataTypeList[col]
            dataVal = rowData[col]
            fo.write(TAB_STR + TAB_STR + '"' + dataName + '": ')
            exportCCellVal(fo, dataType, dataVal)
            if col < len(dataNameList) - 1:
                fo.write(',');
            fo.write(CR_STR)

        fo.write(TAB_STR + '}')
        if(row < len(datas) - 1):
            fo.write(',')
        fo.write(CR_STR)

    fo.write('}')

    fo.close()

if __name__ == '__main__':
    filename = sys.argv[1]
    filepath = SRC_DIR + filename + '.xlsx'
    

    xlsxData = xlrd.open_workbook(filepath)

    sheet = xlsxData.sheet_by_index(0)

    dataTypeList = parseDataType(sheet)

    dataNameList = parseDataName(sheet)
    datas = parseData(sheet)

    exportPath = CLIENT_EXPORT_DIR + filename + '.json'
    exportClient(exportPath, datas, dataNameList, dataTypeList)